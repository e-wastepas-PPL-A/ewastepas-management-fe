"use client";

import { useEffect } from "react";
import { Card } from "flowbite-react";
import React from "react";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import CustomSearchbar from "../components/Searchbar";
import CustomTable from "../components/TabelDropbox";

export function Sidebar1() {
  return (
    <div
      className="Sidebar"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "260px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <CustomSidebar />
    </div>
  );
}

export function Navbar1() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "260px",
        right: 0,
        height: "60px",
        backgroundColor: "#343a40",
        color: "#fff",
      }}
    >
      <CustomNavbar />
    </div>
  );
}

export default function Dropbox() {
  useEffect(() => {
    document.title = "E-Wastepas | Dropbox";
  }, []);

  const summaryData = {
    totalEwaste: 2000,
    totalPoints: 20000,
    wasteperCategory: 400,
    wasteperArea: 100,
  };

  return (
    <div className="bg-gray-100">
      <Navbar1 />
      <Sidebar1 />

      <div
        className="content"
        style={{
          marginLeft: "260px",
          marginTop: "60px",
          padding: "20px",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {/* Summary Cards */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total E-Waste</h3>
              <p className="text-2xl font-bold">{summaryData.totalEwaste} kg</p>
              <p className="text-[10px] text-gray-500">20% meningkat dari bulan lalu</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Points</h3>
              <p className="text-2xl font-bold">{summaryData.totalPoints}</p>
              <p className="text-[10px] text-gray-500">20% meningkat dari bulan lalu</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Waste per Category</h3>
              <p className="text-2xl font-bold">{summaryData.wasteperCategory}</p>
              <p className="text-[10px] text-gray-500">4% meningkat dari bulan lalu</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Waste per Area</h3>
              <p className="text-2xl font-bold">{summaryData.wasteperArea}</p>
              <p className="text-[10px] text-gray-500">1% meningkat dari bulan lalu</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Card style={{ width: "100%", padding: "20px" }}>
          <CustomSearchbar style={{ marginBottom: "1rem" }} />
          <CustomTable />
        </Card>
      </div>
    </div>
  );
}
