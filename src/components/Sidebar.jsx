"use client";

import { useState } from "react";
import { Sidebar } from "flowbite-react";
import Logo from "../assets/ewhale.svg";

const customTheme = {
  root: {
    inner: "h-full overflow-y-auto overflow-x-hidden bg-[#005B96] text-white px-4 py-6",
  },
  item: {
    base: "text-white",
    active: "bg-[#005B96] text-white",
  },
};

export default function CustomSidebar() {
  const [openSections, setOpenSections] = useState({
    registrasi: false,
    datamaster: false,
    penjemputan: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Sidebar aria-label="Sidebar with logo and sections" theme={customTheme}>
     
      <div className="bg-white flex justify-center items-center">
        <img src={Logo} alt="E-WHALE Logo" className="w-28 h-20" />
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* REGISTRASI Section */}
          <h2 className="text-lg font-bold mt-4">REGISTRASI</h2>
          <Sidebar.Item
            onClick={() => toggleSection("registrasi")}
            className="cursor-pointer bg-transparent"
          >
            {openSections.registrasi ? "▲" : "▼"} Registrasi
          </Sidebar.Item>
          {openSections.registrasi && (
            <Sidebar.ItemGroup className="pl-4">
              <Sidebar.Item href="#">Approval Registrasi</Sidebar.Item>
              <Sidebar.Item href="#">Registrasi Kurir</Sidebar.Item>
              <Sidebar.Item href="#">Registrasi Masyarakat</Sidebar.Item>
            </Sidebar.ItemGroup>
          )}

          {/* DATAMASTER Section */}
          <h2 className="text-lg font-bold mt-4">DATAMASTER</h2>
          <Sidebar.Item
            onClick={() => toggleSection("datamaster")}
            className="cursor-pointer bg-transparent"
          >
            {openSections.datamaster ? "▲" : "▼"} DataMaster
          </Sidebar.Item>
          {openSections.datamaster && (
            <Sidebar.ItemGroup className="pl-4">
              <Sidebar.Item href="/">Dashboard</Sidebar.Item>
              <Sidebar.Item href="E-WastePage">E-Waste</Sidebar.Item>
              <Sidebar.Item href="dropbox">Dropbox</Sidebar.Item>
              <Sidebar.Item href="AreaPage">Area</Sidebar.Item>
            </Sidebar.ItemGroup>
          )}

          {/* PENJEMPUTAN Section */}
          <h2 className="text-lg font-bold mt-4">PENJEMPUTAN</h2>
          <Sidebar.Item
            onClick={() => toggleSection("penjemputan")}
            className="cursor-pointer bg-transparent"
          >
            {openSections.penjemputan ? "▲" : "▼"} Penjemputan
          </Sidebar.Item>
          {openSections.penjemputan && (
            <Sidebar.ItemGroup className="pl-4">
              <Sidebar.Item href="history-penjemputan">History Penjemputan</Sidebar.Item>
            </Sidebar.ItemGroup>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
