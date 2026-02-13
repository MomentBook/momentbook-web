#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { createPrivateKey, sign as cryptoSign } from "node:crypto";

function printUsage() {
  console.log(`Usage:
  yarn auth:apple-secret --team-id <TEAM_ID> --key-id <KEY_ID> --client-id <APPLE_ID> --private-key-file <PATH_TO_P8> [--expires-days <1-180>] [--env]

Required:
  --team-id           Apple Developer Team ID
  --key-id            Apple Sign In Key ID
  --client-id         Apple Services ID (this becomes APPLE_ID)
  --private-key-file  Path to .p8 private key file

Optional:
  --expires-days      Expiration days for client secret (default: 180, max: 180)
  --env               Print as APPLE_SECRET="..."

Env fallback:
  APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_ID, APPLE_PRIVATE_KEY_PATH
`);
}

function base64UrlEncode(input) {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function derToJose(derSignature, size) {
  let offset = 0;

  if (derSignature[offset++] !== 0x30) {
    throw new Error("Invalid DER signature format: expected sequence");
  }

  const sequenceLength = derSignature[offset++];
  if (sequenceLength + 2 !== derSignature.length) {
    if (!(sequenceLength & 0x80)) {
      throw new Error("Invalid DER signature length");
    }

    const lengthBytes = sequenceLength & 0x7f;
    let computed = 0;
    for (let i = 0; i < lengthBytes; i += 1) {
      computed = (computed << 8) + derSignature[offset++];
    }
    if (computed + offset !== derSignature.length) {
      throw new Error("Invalid DER signature long length");
    }
  }

  if (derSignature[offset++] !== 0x02) {
    throw new Error("Invalid DER signature format: expected integer R");
  }

  const rLength = derSignature[offset++];
  let r = derSignature.subarray(offset, offset + rLength);
  offset += rLength;

  if (derSignature[offset++] !== 0x02) {
    throw new Error("Invalid DER signature format: expected integer S");
  }

  const sLength = derSignature[offset++];
  let s = derSignature.subarray(offset, offset + sLength);

  while (r.length > 0 && r[0] === 0x00) {
    r = r.subarray(1);
  }
  while (s.length > 0 && s[0] === 0x00) {
    s = s.subarray(1);
  }

  if (r.length > size || s.length > size) {
    throw new Error("Invalid DER signature values (overflow)");
  }

  const rPadded = Buffer.concat([Buffer.alloc(size - r.length, 0), r]);
  const sPadded = Buffer.concat([Buffer.alloc(size - s.length, 0), s]);

  return Buffer.concat([rPadded, sPadded]);
}

function parseArgs(argv) {
  const args = {
    teamId: process.env.APPLE_TEAM_ID ?? "",
    keyId: process.env.APPLE_KEY_ID ?? "",
    clientId: process.env.APPLE_ID ?? "",
    privateKeyFile: process.env.APPLE_PRIVATE_KEY_PATH ?? "",
    expiresDays: 180,
    printEnv: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    const next = argv[i + 1];

    if (current === "--help" || current === "-h") {
      printUsage();
      process.exit(0);
    }

    if (current === "--team-id" && next) {
      args.teamId = next;
      i += 1;
      continue;
    }
    if (current === "--key-id" && next) {
      args.keyId = next;
      i += 1;
      continue;
    }
    if (current === "--client-id" && next) {
      args.clientId = next;
      i += 1;
      continue;
    }
    if (current === "--private-key-file" && next) {
      args.privateKeyFile = next;
      i += 1;
      continue;
    }
    if (current === "--expires-days" && next) {
      const parsed = Number(next);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 180) {
        throw new Error("--expires-days must be an integer between 1 and 180");
      }
      args.expiresDays = parsed;
      i += 1;
      continue;
    }
    if (current === "--env") {
      args.printEnv = true;
      continue;
    }
  }

  return args;
}

function requireValue(name, value) {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required value: ${name}`);
  }

  return value.trim();
}

function createAppleClientSecret({
  teamId,
  keyId,
  clientId,
  privateKeyFile,
  expiresDays,
}) {
  const privateKeyPem = readFileSync(privateKeyFile, "utf8");
  const privateKey = createPrivateKey(privateKeyPem);

  const header = {
    alg: "ES256",
    kid: keyId,
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresDays * 24 * 60 * 60;
  const payload = {
    iss: teamId,
    iat: now,
    exp,
    aud: "https://appleid.apple.com",
    sub: clientId,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const derSignature = cryptoSign(
    "sha256",
    Buffer.from(signingInput),
    privateKey,
  );
  const joseSignature = base64UrlEncode(derToJose(derSignature, 32));

  return `${signingInput}.${joseSignature}`;
}

function main() {
  try {
    const parsed = parseArgs(process.argv.slice(2));
    const teamId = requireValue("TEAM_ID", parsed.teamId);
    const keyId = requireValue("KEY_ID", parsed.keyId);
    const clientId = requireValue("APPLE_ID", parsed.clientId);
    const privateKeyFile = requireValue("APPLE_PRIVATE_KEY_PATH", parsed.privateKeyFile);

    const secret = createAppleClientSecret({
      teamId,
      keyId,
      clientId,
      privateKeyFile,
      expiresDays: parsed.expiresDays,
    });

    if (parsed.printEnv) {
      console.log(`APPLE_SECRET="${secret}"`);
      return;
    }

    console.log(secret);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Failed to generate APPLE_SECRET",
    );
    console.error("");
    printUsage();
    process.exit(1);
  }
}

main();
