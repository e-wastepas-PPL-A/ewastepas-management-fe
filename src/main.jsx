import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./pages/DashboardPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Forgot from "./pages/ForgotPage.jsx";
import RegisterUser from "./pages/RegisterUserPage.jsx";
import RegisterKurir from "./pages/RegisterKurirPage.jsx";
import PermintaanSampah from "./pages/PermintaanSampah.jsx";
import DaftarPenjemputan from "./pages/DaftarPenjemputan.jsx";
import KonversiPoin from "./pages/KonversiPoin.jsx";
import JenisKategori from "./pages/JenisKategoriPage.jsx";
import Dropbox from "./pages/DropboxPage.jsx";
import "./style/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/test",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/register-user",
    element: <RegisterUser />,
  },
  {
    path: "/register-kurir",
    element: <RegisterKurir />,
  },
  {
    path: "/permintaan-sampah",
    element: <PermintaanSampah />,
  },
  {
    path: "/daftar-penjemputan",
    element: <DaftarPenjemputan />,
  },
  {
    path: "/konversi-poin",
    element: <KonversiPoin />,
  },
  {
    path: "/jenis-kategori",
    element: <JenisKategori />,
  },
  {
    path: "/dropbox",
    element: <Dropbox />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
