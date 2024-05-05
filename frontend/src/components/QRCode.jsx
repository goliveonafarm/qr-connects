import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import CircleXmark from "./icons/CircleXmark";

const QRCode = ({ path }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        aria-label="Show QR Code"
        onClick={() => {
          toggleModal();
        }}
        onKeyUp={(e) => e.key === "Enter" && toggleModal()}
        onMouseEnter={() => setBgColor("#1d4ed8")}
        onMouseLeave={() => setBgColor("#ffffff")}
      >
        <div className="relative flex">
          <div className="border border-white">
            <QRCodeSVG
              value={`https://qr-connects.com/}`}
              size={72}
              bgColor={bgColor}
              fgColor="#000000"
              level="Q"
              renderas="svg"
            />
          </div>
          <div className="absolute top-0 right-0 flex mr-auto bg-gray-800 p-1">
            <svg
              height={"30"}
              width={"30"}
              className="fill-blue-700 hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z" />
            </svg>
          </div>
        </div>
      </button>
      {isModalOpen && (
        <div className="absolute right-0 left-0 top-0 flex  items-center">
          <div className="bg-primary-content border border-gray-500 p-5 rounded-lg shadow-lg">
            <div className="flex">
              <div className="border border-white p-2 bg-white">
                <QRCodeSVG
                  value={`https://qr-connects.com/loading/${path}`}
                  size={256}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                  renderas="svg"
                  aria-label="QR Code for event"
                />
              </div>
              <div className="pl-3">
                <button
                  aria-label="Close QR Code"
                  onClick={toggleModal}
                  onKeyUp={(e) => e.key === "Enter" && toggleModal()}
                >
                  <CircleXmark _size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCode;
