"use client";

import { HiPencil, HiTrash } from "react-icons/hi";
import { Table } from "flowbite-react";

import React from 'react';

export default function CustomTable() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-blue-100">
        <thead className="text-xs text-white uppercase" style={{ backgroundColor: '#106EBE', borderBottom: '2px solid #106EBE' }}>
          <tr>
            <th scope="col" className="px-6 py-3">Jenis Sampah Elektronik</th>
            <th scope="col" className="px-6 py-3">Kategori Sampah Elektronik</th>
          </tr>
        </thead>
        <tbody>
          {Array(10).fill().map((_, index) => (
            <tr key={index} className="bg-white border-b hover:bg-blue-100">
              <td className="px-6 py-4 text-black">Jenis Sampah {index + 1}</td>
              <td className="px-6 py-4 text-black">Kategori {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

