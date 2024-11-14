"use client";

import { HiPencil, HiTrash } from "react-icons/hi";
import { Table } from "flowbite-react";
import { useState } from "react";

import React from 'react';

export default function CustomTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
              <thead className="text-xs text-white uppercase" style={{ backgroundColor: '#106EBE', borderBottom: '2px solid #106EBE' }}>
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Kabupaten
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Kecamatan
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Kelurahan
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Total E-Waste
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Poin
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
                  <tr class="bg-white border-b border-grey hover:bg-blue-100">
                      <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                          Kab. Bandung
                      </th>
                      <td class="px-6 py-4 text-black">
                          Kec. Margahayu
                      </td>
                      <td class="px-6 py-4 text-black">
                          Sayati
                      </td>
                      <td class="px-6 py-4 text-black">
                          400 Kw
                      </td>
                      <td class="px-6 py-4 text-black">
                          999 Pts
                      </td>
                  </tr>
              </tbody>
          </table>
          {isModalOpen && <CustomPopUp onClose={() => setIsModalOpen(false)} />}
      </div>
  );
}

