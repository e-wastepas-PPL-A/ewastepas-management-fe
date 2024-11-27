import { useEffect } from "react";
import React from "react";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";

// Sidebar component
export function Sidebar1() {
  return (
    <div className="Sidebar" style={{
      position: "fixed", 
      left: 0, 
      top: 0, 
      width: "260px", 
      height: "100vh", 
      backgroundColor: "#f8f9fa" 
    }}>
      <CustomSidebar />
    </div>
  );
}

// Navbar component
export function Navbar1() {
  return (
    <div style={{ position: "fixed", top: 0, left: "260px", right: 0, height: "60px", backgroundColor: "#343a40", color: "#fff" }}>
      <CustomNavbar />
    </div>
  );
}

// Importing necessary chart components
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function PageName() {
  useEffect(() => {
    document.title = "E-Wastepas | E-Waste";
  }, []);

  // Data for the chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Bulan",
        },
      },
      y: {
        title: {
          display: true,
          text: "Tons",
        },
      },
    },
  };

  // Sample data for leaderboard and summary
  const userLeaderboardData = [
    { profileImage: "", name: "Rumah Tangga Besar", points: 637, rankChange: 1 },
    { profileImage: "", name: "Rumah Tangga Kecil", points: 555, rankChange: -1 },
    { profileImage: "", name: "Peralatan IT", points: 510, rankChange: 0 },
    { profileImage: "", name: "Lampu", points: 500, rankChange: 1 },
    { profileImage: "", name: "Mainan Elektronik", points: 456, rankChange: -1 },
    { profileImage: "", name: "Peralatan Elektronik Lainnya", points: 345, rankChange: -1 },
  ];

  const summaryData = {
    totalEwaste: 2000,
    totalPoints: 20000,
    wasteperCategory: 400,
    wasteperArea: 100,
  };

  const renderRankChange = (rankChange) => {
    if (rankChange === 1) {
      return <span className="text-green-500">&#x2191;</span>;
    } else if (rankChange === -1) {
      return <span className="text-red-500">&#x2193;</span>;
    } else {
      return <span className="text-gray-500">-</span>;
    }
  };

  // Sample data for history table
  const historyData = [
    { date: "01/01/2024", location: "Sayati", type: "Peralatan IT", weight: 200, status: "Terkirim" },
    { date: "01/01/2024", location: "Sayati", type: "Peralatan IT", weight: 150, status: "Terkirim" },
    { date: "01/01/2024", location: "Sayati", type: "Peralatan IT", weight: 300, status: "Terkirim" },
    { date: "01/01/2024", location: "Sayati", type: "Peralatan IT", weight: 250, status: "Terkirim" },
    { date: "01/01/2024", location: "Sayati", type: "Peralatan IT", weight: 175, status: "Terkirim" },
  ];

  return (
    <div>
      <Navbar1 />
      <Sidebar1 />

      {/* Main Content Area */}
      <div
        className="content"
        style={{
          marginLeft: "260px",
          marginTop: "60px",
          padding: "20px",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {/* Summary Cards */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mb-8">
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

        {/* History Table */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">History Penjemputan</h2>
            <div className="flex items-center">
              <label className="mr-2">Tipe Report:</label>
              <select className="border border-gray-300 rounded-md p-1">
                <option>Semua Order</option>
                <option>Semua Pickup Drop Box</option>
                <option>Semua Jenis Sampah</option>
              </select>
            </div>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Tanggal</th>
                <th className="pb-2">Alamat Drop Box</th>
                <th className="pb-2">Tipe Sampah</th>
                <th className="pb-2">Weight (kg)</th>
                <th className="pb-2">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.date}</td>
                  <td className="py-2">{item.location}</td>
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">{item.weight}</td>
                  <td className="py-2 text-blue-500">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
