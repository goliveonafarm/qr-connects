import ReactDOM from "react-dom";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCode = ({ path, _size }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex">
      <div className="mt-auto mb-auto border border-white p-1 bg-white">
        <QRCodeSVG
          value={`https://qr-connects.onrender.com/loading/${path}`}
          size={_size}
          bgColor="#ffffff"
          fgColor="#000000"
          level="Q"
          renderas="svg"
        />
      </div>
      <div className="pl-2 mb-auto">
        <svg
          height={"30"}
          width={"30"}
          className="fill-success cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={() => toggleModal()}
        >
          <path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z" />
        </svg>
        {/* Conditionally rendered modal dialog */}
        {isModalOpen && (
          <div className="absolute inset-0 flex  items-center">
            <div className="modal-box rounded-lg shadow-lg">
              {/* Modal content */}
              <div className="flex">
                <div className="border border-white p-2 bg-white">
                  <QRCodeSVG
                    value={`https://qr-connects.onrender.com/loading/${path}`}
                    size={256}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="Q"
                    renderas="svg"
                  />
                </div>
                <div className="pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="cursor-pointer hover:text-blue-500"
                    onClick={toggleModal}
                  >
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCode;
