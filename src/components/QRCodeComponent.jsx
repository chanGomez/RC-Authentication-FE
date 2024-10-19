import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = ({ qrCode }) => {
  return <QRCodeSVG value={qrCode} />;
};

export default QRCodeComponent;
