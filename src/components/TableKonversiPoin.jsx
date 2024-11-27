"use client";

import { HiPencil, HiTrash } from "react-icons/hi";
import { Table } from "flowbite-react";

export default function CustomTable() {
  return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-white uppercase" style={{ backgroundColor: '#106EBE', borderBottom: '2px solid #106EBE' }}>
            <tr>
              <th scope="col" className="px-6 py-3">Jenis Sampah Elektronik</th>
              <th scope="col" className="px-6 py-3">Kategori Sampah Elektronik</th>
              <th scope="col" className="px-6 py-3">Poin</th>
            </tr>
          </thead>
          <tbody>
            {Array(10).fill().map((_, index) => (
              <tr key={index} className="bg-white border-b hover:bg-blue-100">
                <td className="py-2 px-4">Jenis Sampah</td>
                <td className="py-2 px-4">Kategori</td>
                <td className="py-2 px-4">Poin</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
}
