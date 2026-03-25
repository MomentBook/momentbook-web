declare module "qrcode" {
  export type QRCodeErrorCorrectionLevel = "L" | "M" | "Q" | "H";
  export type QRCodeStringRenderType = "utf8" | "svg" | "terminal";

  export type QRCodeToStringOptions = {
    type?: QRCodeStringRenderType;
    width?: number;
    margin?: number;
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    color?: {
      dark?: string;
      light?: string;
    };
  };

  export function toString(
    text: string,
    options?: QRCodeToStringOptions,
  ): Promise<string>;

  const QRCode: {
    toString: typeof toString;
  };

  export default QRCode;
}
