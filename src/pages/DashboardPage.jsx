import { useEffect } from "react";
import React from "react";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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

export function Navbar1() {
  return (
    <div style={{ position: "fixed", top: 0, left: "260px", right: 0, height: "60px", backgroundColor: "#343a40", color: "#fff" }}>
      <CustomNavbar />
    </div>
  );
}

export default function PageName() {
  useEffect(() => {
    document.title = "E-Wastepas | Dashboard";
  }, []);

  const summaryData = {
    totalEwaste: 2000,
    totalPoints: 20000,
    wasteperCategory: 400,
    wasteperArea: 100,
  };

    // Sample data for the leaderboard
    const leaderboardData = [
      { name: "John Doe", points: 120 },
      { name: "Jane Smith", points: 95 },
      { name: "Sam Wilson", points: 80 },
      { name: "Chris Brown", points: 70 },
      { name: "Alice Cooper", points: 60 },
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

  // Sample data for Leaderboards
  const userLeaderboardData = [
    { profileImage: "https://randomuser.me/api/portraits/men/1.jpg", name: "John Doe", points: 120, rankChange: 1 },
    { profileImage: "https://randomuser.me/api/portraits/women/2.jpg", name: "Jane Smith", points: 95, rankChange: -1 },
    { profileImage: "https://randomuser.me/api/portraits/men/3.jpg", name: "Sam Wilson", points: 80, rankChange: 0 },
    { profileImage: "https://randomuser.me/api/portraits/men/4.jpg", name: "Chris Brown", points: 70, rankChange: 1 },
    { profileImage: "https://randomuser.me/api/portraits/women/5.jpg", name: "Alice Cooper", points: 60, rankChange: -1 },
  ];

  const kurirLeaderboardData = [
    { profileImage: "https://randomuser.me/api/portraits/men/6.jpg", name: "Mark Jacobs", points: 130, rankChange: 0 },
    { profileImage: "https://randomuser.me/api/portraits/women/7.jpg", name: "Lily Adams", points: 120, rankChange: -1 },
    { profileImage: "https://randomuser.me/api/portraits/men/8.jpg", name: "James Bond", points: 115, rankChange: 1 },
    { profileImage: "https://randomuser.me/api/portraits/women/9.jpg", name: "Linda White", points: 110, rankChange: 1 },
    { profileImage: "https://randomuser.me/api/portraits/men/10.jpg", name: "Andrew Clark", points: 105, rankChange: -1 },
  ];

  const ewasteLeaderboardData = [
    { profileImage: "", name: "Televisi", points: 200, rankChange: 1 },
    { profileImage: "", name: "Blender", points: 180, rankChange: -1 },
    { profileImage: "", name: "Smartphone", points: 170, rankChange: 0 },
    { profileImage: "", name: "Lemari Es", points: 160, rankChange: -1 },
    { profileImage: "", name: "Air Conditioner", points: 150, rankChange: 1 },
  ];


  // Data and options for the bar chart
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "",
        data: [150, 200, 170, 300, 250, 280, 220, 310, 290, 350, 320, 370],
        backgroundColor: "#4F46E5",
        borderRadius: 5,
      },
    ],
  };
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
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

  // Data untuk line chart yang telah dikustomisasi
  const lineChartData = {
    labels: ["TV", "Radio", "Monitor", "Laptop", "Lampu"],
    datasets: [
      {
        data: [200, 150, 220, 180, 200],
        borderColor: "#1F6FEB",
        backgroundColor: "rgba(31, 111, 235, 0.1)",
        borderWidth: 2,
        pointRadius: 0, // Menghilangkan titik data untuk tampilan yang lebih halus
        tension: 0.4,    // Membuat garis menjadi lebih mulus
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 14 },
          color: "#333",
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Navbar1 />
      <Sidebar1 />

      <div className="content" style={{ marginLeft: "260px", marginTop: "60px", padding: "20px", minHeight: "calc(100vh - 60px)", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>
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

        <h1 className="text-2xl font-bold mb-4">Aktivitas</h1>

        <div className="flex justify-between mb-8 w-full">
          {/* Bar Chart for E-Waste */}
          <div className="w-1/2 pr-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Line Chart for Aktivitas and Kontribusi */}
          <div className="w-1/2 pl-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Kontribusi E - Waste</h3>
              <p className="text-5xl font-bold">1000</p>
              <p className="text-md text-blue-600">30 Hari Terakhir <span className="text-green-500">+3%</span></p>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8">Berkinerja Baik</h1>

        <div className="flex justify-between w-full space-x-4">
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3">
            <h3 className="text-lg font-semibold mb-4">User Leaderboard</h3>
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


          {/* Kurir Leaderboard */}
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3">
            <h3 className="text-lg font-semibold mb-4">Kurir Leaderboard</h3>
            <div className="space-y-4">
              {kurirLeaderboardData.map((entry, index) => (
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

          {/* E-Waste Leaderboard */}
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3">
            <h3 className="text-lg font-semibold mb-4">E-Waste Leaderboard</h3>
            <div className="space-y-4">
              {ewasteLeaderboardData.map((entry, index) => (
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