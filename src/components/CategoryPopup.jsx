import React from "react";

const CategoryPopup = ({ isOpen, onClose, category, wastes }) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-[24px] shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {category.waste_type_name} {/* Menampilkan nama kategori */}
        </h2>
        <ul className="space-y-2">
          {wastes?.map((waste, index) => ( // Menampilkan daftar jenis sampah
            <li key={index} className="text-gray-700">
              <div className="flex justify-between items-center">
                <span>{waste.waste_name}</span>
                <span className="text-sm text-gray-500">{waste.point} points</span>
              </div>
              {waste.description && (
                <p className="text-sm text-gray-400 mt-1">{waste.description}</p>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-[#005B96] text-white px-4 py-2 rounded-[18px] w-full hover:bg-[#004080] transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default CategoryPopup;