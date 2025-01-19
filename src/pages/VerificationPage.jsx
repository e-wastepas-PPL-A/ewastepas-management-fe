import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import Slide1 from "../assets/verifikasiOtp.png";
import InputText from "../components/Input/InputText";
import FooterBar from "../components/Register/FooterBar";
import { verifyRegisterOtp, verifyForgotPasswordOtp, sendOtp } from "../services";
import { useLocation } from "react-router-dom";
import PopUpBerhasil from "../components/PopUpBerhasil";
import PopUpGagal from "../components/PopUpGagal";

export default function VerifyOtpPage() {
    const location = useLocation();
    const [otpCode, setOtpCode] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        document.title = "E-Wastepas | Verifikasi OTP";
        const urlParams = new URLSearchParams(window.location.search);
        setEmail(urlParams.get("email"));
    }, []);

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
      };

    const handleSendOtp = async () => {
        const payload = { 
            otp_code: otpCode,
            email 
        };
      
        try {
          const response = location.pathname.includes("register")
            ? await verifyRegisterOtp(payload)
            : await verifyForgotPasswordOtp(payload);
      
          if (response.status === 200) {
            setSuccess("OTP verified successfully!");
            setError(null);
            setShowSuccessPopup(true);
          } else {
            setError("OTP verification failed. Please try again.");
            setShowErrorPopup(true);
          }
        } catch (error) {
          setError(error.data.message || "OTP verification failed. Please try again.");
          setShowErrorPopup(true);
          setSuccess(null);
        }
      };
      

    const handleResendOtp = async () => {
        const payload = { email };

        try {
            const response = await sendOtp(payload);
            if (response.status === 200) {
                setSuccess("OTP sent successfully!");
                setError(null);
            }
        } catch (error) {
            setError("An error occurred while resending OTP. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <>
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <div className="text-start mb-[24px]">
                </div>
                <img src={Slide1} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2 px-[8px]">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[30px] font-[600] font-bold flex justify-center">Verifikasi Kode OTP</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Kode otentikasi telah dikirim ke email Anda.</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputText label={"Masukan Kode"} value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                    </div>
                    <div className="mb-[24px]">
                        <button
                            className="bg-[#005B96] hover:bg-[#005B96] w-full py-[8px] text-white text-[14px] font-[600] rounded-md transition duration-300 ease-in-out"
                            onClick={handleSendOtp}
                            disabled={!otpCode}
                        >
                            Kirim
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                                Tidak mendapatkan kode?{" "}
                                <a onClick={handleResendOtp} className="text-revamp-error-300 cursor-pointer hover:underline">
                                    Kirim Ulang
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
            title={"Kode OTP berhasil diverifikasi!"}
            navigateTo={
                location.pathname.includes("register")
                ? "/login"
                : `/forgot-password/change-password?email=${email}`}/>
        <PopUpGagal isOpen={showErrorPopup} onClose={() => setShowErrorPopup(false)} />
        </>
    );
}
