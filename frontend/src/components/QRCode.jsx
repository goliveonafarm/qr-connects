import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";

const QRCode = ({ path }) => {
  return (
    <QRCodeSVG
      value={`https://qr-connects.onrender.com/loading/${encodeURIComponent(path)}`}
      size={256}
      bgColor="#ffffff"
      fgColor="#000000"
      level="Q"
      renderas="svg"
    />
  );
};

export default QRCode;
