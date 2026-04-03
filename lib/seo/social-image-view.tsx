/* eslint-disable @next/next/no-img-element */

type SocialImageViewProps = {
  eyebrow: string;
  title: string;
  description?: string | null;
  meta?: string | null;
  backgroundImageUrl?: string | null;
  sideImageUrl?: string | null;
  sideImageAlt?: string | null;
};

function trimText(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function clampText(value: string | null | undefined, maxLength: number): string | null {
  const trimmed = trimText(value);

  if (!trimmed || trimmed.length <= maxLength) {
    return trimmed;
  }

  const truncated = trimmed.slice(0, maxLength);
  const boundary = truncated.lastIndexOf(" ");
  const safeBoundary = boundary > 0 ? boundary : maxLength;

  return `${truncated.slice(0, safeBoundary).trim()}...`;
}

export function SocialImageView({
  eyebrow,
  title,
  description,
  meta,
  backgroundImageUrl,
  sideImageUrl,
  sideImageAlt,
}: SocialImageViewProps) {
  const safeDescription = clampText(description, 180);
  const safeMeta = clampText(meta, 72);
  const hasBackgroundImage = Boolean(trimText(backgroundImageUrl));
  const hasSideImage = Boolean(trimText(sideImageUrl));

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: hasBackgroundImage
          ? "#111827"
          : "linear-gradient(135deg, #f7efe2 0%, #ead9bb 48%, #d8b98c 100%)",
        color: "#fffaf2",
      }}
    >
      {hasBackgroundImage ? (
        <>
          <img
            src={backgroundImageUrl ?? undefined}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(10, 16, 28, 0.92) 0%, rgba(10, 16, 28, 0.72) 54%, rgba(10, 16, 28, 0.35) 100%)",
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              top: -180,
              right: -120,
              width: 420,
              height: 420,
              borderRadius: 9999,
              background: "rgba(255, 250, 242, 0.22)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -140,
              left: -100,
              width: 320,
              height: 320,
              borderRadius: 9999,
              background: "rgba(125, 80, 28, 0.18)",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: hasSideImage ? "68%" : "100%",
            paddingRight: hasSideImage ? 32 : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: hasBackgroundImage ? "rgba(255, 247, 237, 0.86)" : "#72471c",
              }}
            >
              <span>{eyebrow}</span>
              <span
                style={{
                  width: 48,
                  height: 2,
                  background: hasBackgroundImage ? "rgba(255, 247, 237, 0.45)" : "#9b6a34",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: 62,
                  lineHeight: 1.06,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                {title}
              </h1>

              {safeDescription ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: 28,
                    lineHeight: 1.35,
                    color: hasBackgroundImage ? "rgba(255, 247, 237, 0.9)" : "#4d3418",
                  }}
                >
                  {safeDescription}
                </p>
              ) : null}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                MomentBook
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: hasBackgroundImage ? "rgba(255, 247, 237, 0.78)" : "#6b4b24",
                }}
              >
                Quietly remembered journeys and moments
              </span>
            </div>

            {safeMeta ? (
              <div
                style={{
                  display: "flex",
                  maxWidth: 360,
                  borderRadius: 9999,
                  padding: "12px 18px",
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  textAlign: "right",
                  color: hasBackgroundImage ? "#fff7ed" : "#5a3a14",
                  background: hasBackgroundImage
                    ? "rgba(255, 247, 237, 0.14)"
                    : "rgba(255, 247, 237, 0.74)",
                }}
              >
                {safeMeta}
              </div>
            ) : null}
          </div>
        </div>

        {hasSideImage ? (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32%",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                width: "100%",
                height: "100%",
                maxHeight: 520,
                borderRadius: 28,
                overflow: "hidden",
                border: hasBackgroundImage
                  ? "1px solid rgba(255, 247, 237, 0.18)"
                  : "1px solid rgba(114, 71, 28, 0.18)",
                background: hasBackgroundImage
                  ? "rgba(255, 247, 237, 0.08)"
                  : "rgba(255, 247, 237, 0.72)",
                boxShadow: "0 22px 56px rgba(15, 23, 42, 0.28)",
              }}
            >
              <img
                src={sideImageUrl ?? undefined}
                alt={sideImageAlt ?? ""}
                width={360}
                height={520}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
