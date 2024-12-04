import React from 'react';
import { FaUserAlt, FaTrashAlt, FaBox, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from "../assets/ewhale.svg";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#005B96] text-white flex flex-col">
      {/* Logo */}
      <div className="bg-white flex justify-center items-center py-4">
        {/* Tambahkan Link untuk mengarahkan ke /dashboard */}
        <Link to="/">
          <img src={Logo} alt="E-WHALE Logo" className="w-27 h-27 cursor-pointer" />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-grow p-4">
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-300 mb-2">PROFIL</p>
          <ul>
            <li className="flex items-center mb-4 cursor-pointer hover:text-blue-300">
              <FaUserAlt className="mr-3" />
              <Link to="/ubah-profil">Ubah Profil</Link>
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-300">
              <FaTrashAlt className="mr-3" />
              <Link to="/kategori-sampah">Kategori Sampah</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-300 mb-2">DASHBOARD</p>
          <ul>
            <li className="flex items-center mb-4 cursor-pointer hover:text-blue-300">
              <FaTrashAlt className="mr-3" />
              <Link to="/E-WastePage">E-Waste</Link>
            </li>
            <li className="flex items-center mb-4 cursor-pointer hover:text-blue-300">
              <FaBox className="mr-3" />
              <Link to="/dropbox">Dropbox</Link>
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-300">
              <FaHistory className="mr-3" />
              <Link to="/history-penjemputan">History Penjemputan</Link>
            </li> 
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
