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
import EWastePage from './pages/E-WastePage.jsx';
import Area from './pages/AreaPage.jsx';
import HistoryPenjemputanPage from './pages/HistoryPenjemputanPage.jsx';
import VerificationPage from './pages/VerificationPage.jsx';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import EditProfilePage from './pages/EditProfilePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/e-wastepage",
    element: <EWastePage />,
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
    path: "/forgot-password",
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
  {
    path: "/areapage",
    element: <Area />,
  },
  {
    path: "/history-penjemputan",
    element: <HistoryPenjemputanPage />,
  },
  {
    path: "/register/verification",
    element: <VerificationPage />,
  },
  {
    path: "/forgot-password/verification",
    element: <VerificationPage />,
  },
  {
    path: "forgot-password/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path : "/ubah-profil",
    element : <EditProfilePage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);