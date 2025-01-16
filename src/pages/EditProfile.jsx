import React, { useState } from "react";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import InputEmail from "../components/Input/InputEmail";
import InputText from "../components/Input/InputText";
import PopUpBerhasil from "../components/PopUpProfile";
import PopUpGagal from "../components/PopUpProfileGagal";

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    address: "Jl. Jendral Sudirman",
    contactNumber: "08123456789",
    city: "Bandung",
    country: "Indonesia",
    birthDate: "12/05/2024",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpGagalOpen, setIsPopUpGagalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    setIsPopUpOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomSidebar />
      <div className="flex-1 flex flex-col p-10 space-y-8">
        <CustomNavbar/>
        <h1 className="text-3xl font-bold text-center mb-6">Ubah Profil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          <div className="space-y-4">
            <InputText
              label="Nama Lengkap"
              name="fullName"
              value={`${profile.firstName} ${profile.lastName}`}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <InputEmail
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <InputText
              label="Alamat"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <InputText
              label="Nomor Handphone"
              name="contactNumber"
              value={profile.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kota</label>
                <select
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                >
                  <option value="Bandung">Bandung</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Surabaya">Surabaya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Negara</label>
                <select
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                >
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapura">Singapura</option>
                </select>
              </div>
            </div>
            <InputText
              label="Tanggal Lahir"
              name="birthDate"
              value={profile.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-col items-center justify-start mt-6">
            {profileImage ? (
              <img
                src={profileImage}
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
              Choose Photo
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
            Batal
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            Simpan
          </button>
        </div>
        <PopUpBerhasil
          isOpen={isPopUpOpen}
          onClose={() => setIsPopUpOpen(false)}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <PopUpGagal
          isOpen={isPopUpGagalOpen}
          onClose={() => setIsPopUpGagalOpen(false)}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
