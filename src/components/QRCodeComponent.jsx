import React from "react";

const QRCodeComponent = ({ qrCode, otpauthURL }) => {
  return <img src={qrCode} alt="QR Code" />
};

export default QRCodeComponent;
