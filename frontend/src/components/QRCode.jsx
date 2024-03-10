import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";

const QRCode = ({ path }) => {
    console.log(path)
  return (
    <QRCodeSVG
      value={`https://qr-connects.onrender.com/${path}`}
      size={256}
      bgColor="#ffffff"
      fgColor="#000000"
      level="Q"
      renderas="svg"
    />
  );
};

export default QRCode;
