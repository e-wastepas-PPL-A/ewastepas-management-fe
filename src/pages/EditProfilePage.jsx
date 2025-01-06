import React, { useState, useEffect } from "react";
import { updateProfile } from "../services"; // Pastikan implementasi sesuai
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import InputName from "../components/Input/InputName";
import InputEmail from "../components/Input/InputEmail";
import InputText from "../components/Input/InputText";
import PopUpBerhasil from "../components/PopUpBerhasil";
import PopUpGagal from "../components/PopUpGagal";
import Cookies from "js-cookie"; // Untuk mengambil token

export default function PageName() {
  // Menggunakan useState terpisah untuk setiap field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [token, setToken] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpGagalOpen, setIsPopUpGagalOpen] = useState(false);

  useEffect(() => {
    // Mengambil token dari cookie saat pertama kali
    setToken(Cookies.get('PHPSESSID'));
  }, []);

  // Fungsi untuk menangani perubahan input
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "date_of_birth") {
      setDateOfBirth(value);
    }
  };

  // Fungsi untuk menangani perubahan gambar
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
  
    // Pastikan dateOfBirth valid sebelum digunakan
    let formattedDate = "";
    if (dateOfBirth) {
      const parsedDate = new Date(dateOfBirth);
      if (!isNaN(parsedDate.getTime())) {  // Cek apakah tanggal valid
        formattedDate = parsedDate.toISOString().split('T')[0];  // Format menjadi YYYY-MM-DD
      } else {
        console.error("Tanggal tidak valid:", dateOfBirth);
      }
    }
  
    formData.append("date_of_birth", formattedDate);
  
    if (profileImage) {
      formData.append("photo", profileImage);
    }
  
    try {
      const response = await updateProfile(formData, token);
    
      // Pastikan respons statusnya benar
      if (response?.message === 'Profile updated successfully') {
        const updatedUser = {
          name: response?.management?.name || formData.get("name"),
          email: response?.management?.email || formData.get("email"),
          photo: response?.photo_url || profileImage.get("photo"),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsPopUpOpen(true);
        console.log("Profil berhasil diperbarui:", response.management);
      } else {
        localStorage.setItem("user", JSON.stringify({ name, email, photo: profileImage }));
        setIsPopUpOpen(true);
        console.error("Gagal memperbarui profil:", response?.message);
      }
    } catch (error) {
      setIsPopUpGagalOpen(true);
      console.error("Terjadi kesalahan saat memperbarui profil:", error.response?.data || error.message);
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
          zIndex: 1000, // Pastikan navbar tetap di atas
        }}
      >
        <CustomNavbar />
      </div>
      <div
        className="content"
        style={{
          marginLeft: "260px",
          padding: "150px 20px 20px", // Tambahkan padding untuk memberikan ruang bagi navbar tetap
          minHeight: "calc(100vh - 60px)", // Agar konten tidak tertutup oleh navbar yang tetap
          paddingTop: "80px", // Berikan ruang lebih pada bagian atas untuk memastikan form tidak tertutup
        }}
      >
        <h1 className="text-3xl font-bold mb-6">Ubah Profil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          <div className="space-y-4">
            <h2 className="font-semibold text-2xl pt-4">Nama Depan</h2>
            <InputName
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full px-4 py-2 border-gray-300 rounded-md"
            />
            <h2 className="font-semibold text-2xl pt-4">Email</h2>
            <InputEmail
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <h2 className="font-semibold text-2xl pt-4">Alamat</h2>
            <InputText
              name="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <h2 className="font-semibold text-2xl pt-4">No Telepon</h2>
            <InputText
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <h3 className="font-semibold text-2xl pt-4">Tanggal Lahir</h3>
            <InputText
              name="date_of_birth"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="date"
            />
          </div>
          <div className="flex flex-col items-center justify-start mt-6">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="w-40 h-40 rounded-full mb-4 object-cover"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="upload-button"
            />
            <label
              htmlFor="upload-button"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Pilih Foto
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
            Batal
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={saveProfile}
          >
            Simpan
          </button>
        </div>
        <PopUpBerhasil
          isOpen={isPopUpOpen}
          onClose={() => setIsPopUpOpen(false)}
        />
        <PopUpGagal
          isOpen={isPopUpGagalOpen}
          onClose={() => setIsPopUpGagalOpen(false)}
        />
      </div>
    </div>
  );
}
