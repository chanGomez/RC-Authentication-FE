import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = ({ otpauthURL }) => {
  return <QRCodeSVG value={otpauthURL}/>;
};

export default QRCodeComponent;
