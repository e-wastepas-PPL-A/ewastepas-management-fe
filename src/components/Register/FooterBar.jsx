import IcGoogle from "../../assets/ic-google.svg";
import { useEffect } from "react";


const FooterBar = () => {
  const handleGoogleLogin = () => {
    try {
       // Ganti dengan import.meta.env untuk membaca variabel lingkungan
    
    // Redirect ke endpoint Google OAuth di backend
    window.location.href = `http://localhost:8000/api/auth/google`;
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Failed to login with Google. Please try again.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");
  
    if (token) {
      localStorage.setItem("token", token);
      alert("Login successful!");
    }
  
    if (error) {
      alert("Login failed: " + error);
    }
  }, []);
  

   return (
        <div className="mb-[24px]">
        <div className="flex justify-between items-center mb-[24px]">
            <span className="border border-revamp-neutral-7 border-1 w-full"></span>
            <span className="text-revamp-neutral-7 w-full">Atau daftar dengan</span>
            <span className="text-revamp-neutral-7 w-full">Atau daftar dengan</span>
            <span className="border border-revamp-neutral-7 border-1 w-full"></span>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
            <button className="rounded-full shadow-lg w-[300px] h-[48px] flex items-center justify-center" onClick={handleGoogleLogin}>
                <img src={IcGoogle} alt="Google Icon" className="h-6 w-6" />
                <span className="ml-2 text-revamp-neutral-7">Daftar dengan Akun Google Anda</span>
            </button>
        </div>
        </div>
    );
  };

export default FooterBar;
