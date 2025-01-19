import React, { useEffect, useState } from "react";
import { getCategories, getWastesByCategory } from "../services";
import { WastePieChart } from "../components/pie-chart";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import { Monitor } from "lucide-react";
import CategoryPopup from "../components/CategoryPopup";

export default function JenisKategori() {
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWastes, setSelectedWastes] = useState([]);

  useEffect(() => {
    document.title = "E-Wastepas | Jenis & Kategori";

    const loadCategories = async () => {
      try {
        const response = await getCategories();
        if (response && Array.isArray(response.data)) {
          const transformedCategories = response.data.map((item) => ({
            title: item.waste_type_name,
            waste_type_id: item.waste_type_id,
          }));
          setCategories(transformedCategories);

          const transformedChartData = response.data.map((item, index) => ({
            name: item.waste_type_name,
            value: item.waste_type_id,
            color: COLORS[index % COLORS.length],
          }));
          setChartData(transformedChartData);
        } else {
          console.error("Unexpected data format:", response);
          setCategories([]);
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const COLORS = ["#006494", "#40A4A4", "#1D4B4B", "#EBEAFF", "#FFD6BA", "#FFAAA6"];

  const handleCategoryClick = async (category) => {
    if (!category.waste_type_id) {
      console.error("Invalid waste_type_id");
      return;
    }
    setSelectedCategory(category);
    setIsPopupOpen(true);
    try {
      const response = await getWastesByCategory(category.waste_type_id);
      if (response && response.wastes && Array.isArray(response.wastes)) {
        setSelectedWastes(response.wastes);
      } else {
        console.error("Unexpected data format:", response);
        setSelectedWastes([]);
      }
    } catch (error) {
      console.error("Error fetching wastes:", error);
      setSelectedWastes([]);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "260px",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <CustomSidebar />
      </div>
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
      <div
        className="content"
        style={{
          marginLeft: "260px",
          marginTop: "60px",
          padding: "20px",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="mb-6">
          <center>
            <h1 className="text-3xl font-bold">Kategori Sampah</h1>
          </center>
        </div>
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-3 rounded-lg bg-blue-600 p-4">
                    <Monitor className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-sm font-medium text-gray-600">
                    {category.title}
                  </h3>
                  <p className="text-xl font-bold">{category.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full justify-center items-center h-[400px]">
            <WastePieChart data={chartData} />
          </div>
        </>
        <CategoryPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          category={selectedCategory}
          wastes={selectedWastes}
        />
      </div>
    </div>
  );
}