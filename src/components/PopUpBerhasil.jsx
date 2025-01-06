"use client";

import React from "react";
import berhasilIcon from "../assets/berhasil.png";


const PopUpBerhasil = ({ isOpen, onClose, title, navigateTo }) => {

  const handleButtonClick = () => {
    if (navigateTo) {
    window.location.href = navigateTo;
    }
    if (onClose){
    onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-[24px] shadow-lg text-center w-80">
            <div className="flex justify-center mb-4">
              <img src={berhasilIcon} alt="Berhasil" className="w-20 h-20" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{"Berhasil !"}</h2>
            <p className="text-1sm mb-4 text-gray-800">{title}</p>
            <button
              onClick={handleButtonClick}
              className="bg-[#005B96] hover:-[#005B96] text-white px-20 py-2 rounded-[18px]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpBerhasil;