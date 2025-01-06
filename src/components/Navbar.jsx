"use client";

import { useState, useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { HiBell } from "react-icons/hi";
import { logout } from "../services";

export default function CustomNavbar() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: null, // Tambahkan property photo
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user); // Memperbarui state profil dengan data terbaru dari localStorage
    }
  }, []);

  const photoUrl = typeof user.photo === "string" 
  ? user.photo 
  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg";


  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Logout ke backend
      await logout(token);

      // Hapus data dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Reset state user
      setUser({
        name: "",
        email: "",
        photo: null,
      });

      alert("Successfully logged out!");
      window.location.href = "/login";
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
      img={
        typeof user.photo === "string" 
          ? user.photo 
          : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      }
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
