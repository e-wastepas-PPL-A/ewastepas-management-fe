"use client";

import { useState, useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { HiBell } from "react-icons/hi";
import { logout } from "../services";
import { useNavigate } from "react-router-dom"; // Gantilah dengan useNavigate dari react-router-dom

export default function CustomNavbar() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: null,
  });
  
  const navigate = useNavigate(); // Gunakan navigate dari react-router-dom

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (!userFromStorage) {
      // Jika tidak ada data pengguna, arahkan ke halaman login
      navigate("/login");
    } else {
      setUser(userFromStorage);
    }
  }, [navigate]); // Pastikan hanya dijalankan sekali saat komponen pertama kali dimuat

  const photoUrl = typeof user.photo === "string"
    ? `${user.photo}`
    : "";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await logout(token);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser({
        name: "",
        email: "",
        photo: null,
      });

      alert("Successfully logged out!");
      navigate("/login"); // Mengarahkan ke halaman login setelah logout
    } catch (error) {
      console.error(error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <Navbar className="bg-gray-100 shadow">
      <Navbar.Collapse className="ml-6">
        <h3 className="text-black mt-2">
          Hello, {user.name || ""}!
        </h3>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={photoUrl}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="ml-auto mr-6">
        <Navbar.Link href="#">
          <HiBell className="mr-2 h-5 w-5" />
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
