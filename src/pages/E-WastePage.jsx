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

// Importing the necessary components for the chart
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Registering the necessary chart components
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

  // Sample data for the leaderboard
  const leaderboardData = [
    { name: "Rumah Tangga Besar", points: 637 },
    { name: "Rumah Tangga Kecil", points: 555 },
    { name: "Peralatan IT", points: 510 },
    { name: "Lampu", points: 500 },
    { name: "Mainan Elektronik", points: 456 },
    { name: "Peralatan Elektronik Lainnya", points: 345 },
  ];

  // Sample data for the summary card
  const summaryData = {
    totalEwaste: 2000,
    totalPoints: 20000,
    wasteperCategory: 400,
    wasteperArea: 100,
  };

  // Sample data for Leaderboards
  const userLeaderboardData = [
    { profileImage: "", name: "Rumah Tangga Besar", points: 637, rankChange: 1 },
    { profileImage: "", name: "Rumah Tangga Kecil", points: 555, rankChange: -1 },
    { profileImage: "", name: "Peralatan IT", points: 510, rankChange: 0 },
    { profileImage: "", name: "Lampu", points: 500, rankChange: 1 },
    { profileImage: "", name: "Mainan Elektronik", points: 456, rankChange: -1 },
    { profileImage: "", name: "Peralatan Elektronik Lainnya", points: 345, rankChange: -1 },
  ];

  // Function to render the rank change arrow
  const renderRankChange = (rankChange) => {
    if (rankChange === 1) {
      return <span className="text-green-500">&#x2191;</span>; // Green up arrow
    } else if (rankChange === -1) {
      return <span className="text-red-500">&#x2193;</span>; // Red down arrow
    } else {
      return <span className="text-gray-500">-</span>; // No change
    }
  };


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
        {/* Summary Cards with Background */}
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
        
        <h1 className="text-2xl font-bold mb-4">Aktivitas</h1>

        <div className="flex justify-between w-full space-x-4">
          
          {/* Left Column with Narrower Width for Chart Tables */}
          <div className="w-3/5 flex flex-col space-y-4">
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div style={{ width: "100%", height: "200px" }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Kontribusi E-Waste</h1>
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-1">1000</h3>
              <h3 className="text-lg font-semibold mb-1">30 Hari Terakhir +3%</h3>
              <div style={{ width: "100%", height: "200px" }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          
          </div>
          
          {/* Right Column for Leaderboard */}
          <div className="w-2/5 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">E-Waste per Category Leaderboard</h3>
            <div className="space-y-4">
              {userLeaderboardData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img src={entry.profileImage} alt={entry.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1 pl-2">
                    <p className="font-medium">{entry.name}</p>
                    <p>{entry.points} Points</p>
                  </div>
                  <div>{renderRankChange(entry.rankChange)}</div>
                </div>
              ))}
              <div className="text-center mt-4">
                <a href="#" className="text-blue-500 font-semibold hover:underline">
                  Lihat Selengkapnya &gt;
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
