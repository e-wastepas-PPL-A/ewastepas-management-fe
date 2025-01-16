import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateProfile, getUsers } from "../services";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import PopUpBerhasil from "../components/PopUpBerhasil";
import PopUpGagal from "../components/PopUpGagal";
import Cookies from "js-cookie";

export default function PageName() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // null untuk default
  const [profileImage, setProfileImage] = useState(null);
  const [token, setToken] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpGagalOpen, setIsPopUpGagalOpen] = useState(false);

  useEffect(() => {
    // Dapatkan token dari cookies
    const token = Cookies.get('PHPSESSID');
    setToken(token);

    // Panggil API untuk mendapatkan data pengguna
    const fetchProfile = async () => {
      try {
        const response = await getUsers(token);
        if (response) {
          setName(response.name || '');
          setEmail(response.email || '');
          setAddress(response.address || '');
          setPhone(response.phone || '');
          setDateOfBirth(response.date_of_birth ? new Date(response.date_of_birth) : null);
          setProfileImage(response.photo || null);
        }
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const saveProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
  
    if (dateOfBirth) {
      formData.append("date_of_birth", dateOfBirth.toISOString().split('T')[0]);
    }
  
    if (profileImage instanceof File) {
      formData.append("photo", profileImage);
    }
  
    try {
      const response = await updateProfile(formData, token);
  
      if (response?.data?.message === 'Profile updated successfully') {
        setName(response.data.management.name);
        setEmail(response.data.management.email);
        setAddress(response.data.management.address);
        setPhone(response.data.management.phone);
        setDateOfBirth(new Date(response.data.management.date_of_birth));
        setProfileImage(response.data.photo_url);
  
        setIsPopUpOpen(true);
        localStorage.setItem("user", JSON.stringify(response.data.management));
      } else {
        setIsPopUpGagalOpen(true);
        console.error("Gagal memperbarui profil:", response?.data?.message || 'Unknown error');
      }
    } catch (error) {
      setIsPopUpGagalOpen(true);
      console.error("Error saat memperbarui profil:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div style={{ position: "fixed", top: 0, left: 0, width: "260px", height: "100vh", backgroundColor: "#f8f9fa" }}>
        <CustomSidebar />
      </div>
      <div style={{ position: "fixed", top: 0, left: "260px", right: 0, height: "60px", backgroundColor: "#343a40", color: "#fff", zIndex: 1000 }}>
        <CustomNavbar />
      </div>
      <div
        className="content"
        style={{
          marginLeft: "400px",
          padding: "150px 20px 20px",
          minHeight: "calc(100vh - 60px)",
          paddingTop: "100px",
        }}
      >
        <h1 className="text-3xl font-bold mb-6">Ubah Profil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                {email || "Email tidak tersedia"}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Alamat</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">No Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nomor telepon"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Tanggal Lahir</label>
              <DatePicker
                selected={dateOfBirth || new Date()} // fallback to current date if null
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Pilih tanggal lahir"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start mt-6">
            {profileImage ? (
              <img
                src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full mb-4 object-cover"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-500">Upload Image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="upload-button" />
            <label htmlFor="upload-button" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              Pilih Foto
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">Batal</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={saveProfile}>
            Simpan
          </button>
        </div>
        <PopUpBerhasil isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
        <PopUpGagal isOpen={isPopUpGagalOpen} onClose={() => setIsPopUpGagalOpen(false)} />
      </div>
    </div>
  );
}
