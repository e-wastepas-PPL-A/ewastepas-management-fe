"use client";

import React from "react";
import berhasilIcon from "../assets/berhasil.png";

const PopUpBerhasil = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-80">
            <div className="flex justify-center mb-4">
              <img src={berhasilIcon} alt="Berhasil" className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Berhasil!</h2>
            <p className="text-gray-600 mb-4">
              Selamat, Profile Anda Berhasil diperbaharui.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
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
