"use client";

import React from "react";
import gagalIcon from "../assets/gagal.png";

const PopUpGagal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-[24px] shadow-lg text-center w-80">
            <div className="flex justify-center mb-4">
              <img src={gagalIcon} alt="Berhasil" className="w-20 h-20" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Gagal!</h2>
            <button
              onClick={onClose}
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

export default PopUpGagal;