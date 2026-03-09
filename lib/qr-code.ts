import QRCode from "qrcode";

const QR_CODE_SIZE = 224;

export async function buildQrCodeSvg(value: string) {
  return QRCode.toString(value, {
    type: "svg",
    width: QR_CODE_SIZE,
    margin: 1,
    errorCorrectionLevel: "M",
    color: {
      dark: "#17221a",
      light: "#ffffff",
    },
  });
}
