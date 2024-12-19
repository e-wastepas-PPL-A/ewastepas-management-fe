import React, { useState } from "react";
import CustomSidebar from "../components/Sidebar";
import CustomNavbar from "../components/Navbar";
import InputEmail from "../components/Input/InputEmail";
import InputText from "../components/Input/InputText";
import { Modal, Button } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "aa",
    lastName: "aa",
    email: "aa@gmail.com",
    address: "aa",
    contactNumber: "123",
    city: "aa",
    country: "aa",
    birthDate: "aa",
  });

  const [profileImage, setProfileImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      setIsSuccessModalOpen(true);
    } else {
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1">
        <CustomNavbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Ubah Profil</h1>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <InputText
                    label="Nama Depan"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <InputText
                    label="Nama Belakang"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <InputEmail
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <InputText
                    label="Alamat"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <InputText
                    label="Nomor Handphone"
                    name="contactNumber"
                    value={profile.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kota</label>
                  <select
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
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
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  >
                    <option value="Indonesia">Indonesia</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Singapura">Singapura</option>
                  </select>
                </div>
                <div>
                  <InputText
                    label="Tanggal Lahir"
                    name="birthDate"
                    value={profile.birthDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
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
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Choose Photo
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="border border-blue-500 text-blue-500 px-4 py-2 mr-2 rounded">Batal</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Simpan</button>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Apakah Anda Yakin Ingin Memperbaharui Profil Anda?</Modal.Header>
        <Modal.Body>
          <p className="text-base leading-relaxed text-gray-500">
            Anda bisa mengubahnya kembali jika data tidak sesuai.
          </p>
          <div className="flex justify-end mt-4">
            <Button color="failure" onClick={() => setIsModalOpen(false)}>Tidak</Button>
            <Button color="success" onClick={handleConfirm} className="ml-2">Perbarui</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
        <Modal.Body className="text-center">
          <HiCheckCircle className="mx-auto mb-4 text-blue-500" size={50} />
          <h3 className="text-lg font-bold">Berhasil!</h3>
          <p className="text-base leading-relaxed text-gray-500">
            Selamat Profil Anda berhasil diperbaharui
          </p>
          <div className="flex justify-center mt-4">
            <Button color="primary" onClick={() => setIsSuccessModalOpen(false)}>Tutup</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
        <Modal.Body className="text-center">
          <HiXCircle className="mx-auto mb-4 text-red-500" size={50} />
          <h3 className="text-lg font-bold">Gagal!</h3>
          <p className="text-base leading-relaxed text-gray-500">
            Profil Anda Gagal diperbaharui
          </p>
          <div className="flex justify-center mt-4">
            <Button color="primary" onClick={() => setIsErrorModalOpen(false)}>Tutup</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}