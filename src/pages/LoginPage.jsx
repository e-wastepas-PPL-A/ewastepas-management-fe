import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "../services";
import Logo from "../assets/logo.png";
import Slide1 from "../assets/login.png";
import InputEmail from "../components/Input/InputEmail";
import InputPassword from "../components/Input/InputPassword";
import InputCheck from "../components/Input/InputCheck";
import FooterBar from "../components/Register/FooterBar";
import PopUpBerhasil from "../components/PopUpBerhasil";
import PopUpGagal from "../components/PopUpGagal";

export default function PageName() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const [resendVerification, setResendVerification] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
          document.title = "E-Wastepas | Register";
      }, []);

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
    
    try {
      const response = await login(payload);
      if (response.status === 200) {
        Cookies.set("PHPSESSID", response.data.token, { expires: 0.25, secure: true });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({
          name: response.data.name,
          email: response.data.email,
          photo: response.data.photo,
        }));
        setShowSuccessPopup(true);
      } else if (response.data.error) {
        setError(response.data.error);
        if (response.data.resend_verification) {
          setResendVerification(true);
        }
        setSuccess(null); 
      }
    } catch (error) {
      if (error.response && error.response.status === 422) { setError(error.response.data.error || {});
      } else {
        setShowErrorPopup(true);
        setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await resendVerificationEmail(email);
      if (response.status === 200) {
        setSuccess("Verification email has been sent.");
        setResendVerification(false);
      } else {
        setError("Failed to resend verification email.");
      }
    } catch (error) {
      setPopUpGagal(true);
      setError("An error occurred while resending the verification email.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const isButtonDisabled = !email || !password;

  return (
    <>
    <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
      <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
        <img src={Slide1} className="max-h-[90vh]" alt="Slide" />
      </div>
      <div className="text-center w-full lg:w-1/2 px-[8px]">
        <div className="flex justify-center">
          <img src={Logo} className="w-[340px]" alt="Logo" />
        </div>
        <div>
          <div className="text-start mb-[24px]">
            <h1 className="text-[40px] font-[600]">Login Management</h1>
            <span className="text-[16px] font-[400] text-revamp-neutral-7">Masuk untuk mengakses akun Past-Trash Anda</span>
          </div>
          {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
          {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
          <div className="mb-[24px]">
          <InputEmail label={'Email'} value={email} onChange={(e) => {
              setEmail(e.target.value);
              setEmailTouched(true);
          }}  className={`border-b ${validateEmail(email) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
          />
          {emailTouched && email.trim() === '' && <span className="text-red-500 text-sm flex">Kolom Tidak Boleh Kosong</span>}
          {!validateEmail(email) && email && <span className="text-red-500 text-sm flex pb-[15px]">Email tidak valid</span>}
          <InputPassword label={'Password'} value={password} onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
          }}  className={`border-b ${validatePassword(password) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
          />
          {passwordTouched && password.trim() === '' && <span className="text-red-500 text-sm flex">Kata Sandi Tidak Boleh Kosong</span>}
          {!validatePassword(password) && password && <span className="text-red-500 text-sm flex">Kata Sandi tidak valid</span>}
          

            <div className="flex justify-between items-center">
              <InputCheck label={"Ingatkan Saya"} value={true} onChange={(e) => setPassword(e.target.value)} />
              <a href="/forgot-password" className="text-revamp-error-300 font-[500]">
                Lupa kata sandi
              </a>
            </div>
          </div>
          <div className="mb-[24px]">
            <button className={`${isButtonDisabled ? 'bg-[#005B96]' : 'bg-[#005B96]'} w-full py-[8px] text-white text-[14px] font-[600] rounded-md`} onClick={handleLogin} disabled={!email || !password}>
              Login
            </button>
            {resendVerification && (
              <div className="mt-4">
                <button
                  className="bg-yellow-500 py-2 px-4 text-white text-sm font-semibold"
                  onClick={handleResendVerification}
                >
                  Kirim Ulang Email Verifikasi
                </button>
              </div>
            )}
            <div className="flex justify-center items-center mt-[10px]">
              <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                Tidak memiliki akun?{" "}
                <a href="/register" className="text-revamp-error-300">
                  Registrasi
                </a>
              </span>
            </div>
          </div>
          <FooterBar />
        </div>
      </div>
    </div>
    <PopUpBerhasil
        isOpen={showSuccessPopup}
        onClose={handleClosePopup}
        title={"Berhasil Masuk Ke Dalam Sistem."}
        navigateTo={`/`}
        />
    <PopUpGagal isOpen={showErrorPopup} onClose={() => setShowErrorPopup(false)} />
  </>
  );
}
