import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Logo from "../assets/logo.png";
import InputEmail from "../components/Input/InputEmail";
import InputPassword from "../components/Input/InputPassword";
import InputCheck from "../components/Input/InputCheck";
import FooterBar from "../components/Register/FooterBar";
import { login } from "../services";
import glogin from "../assets/glogin.png";

export default function PageName() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    document.title = "E-Wastepas | Login";
  }, []);

  const validateInputs = () => {
    if (!email || !password) {
      setError("Email dan kata sandi tidak boleh kosong.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Email tidak valid.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await login(payload);
      if (response.status === 200) {
        setSuccess("Login successful!");
        setError(null);
        Cookies.set("PHPSESSID", response.data.token, { expires: 0.25, secure: true });
        // Redirect to the next page
        window.location.href = "/dashboard"; // Replace "/dashboard" with your desired path
      } else {
        setError(response.response.data.error);
        setSuccess(null);
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
      <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
        <img src={glogin} className="max-h-[90vh]" alt="Gambar Besar" />
      </div>
      <div className="text-center w-full lg:w-1/2 px-[8px]">
        <div className="flex justify-center">
          <img src={Logo} className="w-[340px]" alt="Logo" />
        </div>
        <div>
          <div className="text-start mb-[24px]">
            <h1 className="text-center text-[15px] font-[600]">Log In Untuk Manajemen Sampah</h1>
          </div>
          {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
          {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
          <div className="mb-[24px]">
            <InputEmail
              label={"Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
              className={`border ${error && emailTouched ? "border-red-500" : "border-gray-300"}`}
            />
            {emailTouched && email.trim() === '' && <div className="text-red-500 text-sm text-left mt-[4px] mb-[15px]">Kolom tidak boleh kosong</div>}
            {emailTouched && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <div className="text-red-500 text-sm text-left mt-[4px] mb-[15 px]">Email tidak valid</div>}
            <div className="mt-[8px]">
              <InputPassword
                label={"Kata Sandi"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
                className={`border ${error && passwordTouched ? "border-red-500" : "border-gray-300"}`}
              />
              {passwordTouched && password.trim() === '' && <div className="text-red-500 text-sm text-left mt-[4px]">Kolom tidak boleh kosong</div>}
            </div>
            <div className="flex justify-between items-center">
              <InputCheck label={"Ingat Saya"} value={true} onChange={(e) => setPassword(e.target.value)} />
              <a href="/forgot" className="text-revamp-error-300 font-[500]">
                Lupa Kata Sandi
              </a>
            </div>
          </div>
          <div className="mb-[24px]">
            <button
              className="bg-blue-500 w-full py-[8px] text-white text-[14px] font-[600]"
              onClick={handleLogin}
            >
              Masuk
            </button>
            <div className="flex justify-center items-center mt-[10px]">
              <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                Belum Memiliki Akun?{" "}
                <a href="/register" className="text-revamp-error-300">
                  Daftar Disini
                </a>
              </span>
            </div>
          </div>
          <FooterBar />
        </div>
      </div>
    </div>
  );
}
