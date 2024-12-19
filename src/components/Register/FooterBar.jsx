import IcGoogle from '../../assets/ic-google.svg'

const FooterBar = () => {
    return (
        <div className="mb-[24px]">
        <div className="flex justify-between items-center mb-[24px]">
            <span className="border border-revamp-neutral-7 border-1 w-full"></span>
            <span className="text-revamp-neutral-7 w-full">Atau daftar dengan</span>
            <span className="border border-revamp-neutral-7 border-1 w-full"></span>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
            <button className="rounded-full shadow-lg w-[300px] h-[48px] flex items-center justify-center">
                <img src={IcGoogle} alt="Google Icon" className="h-6 w-6" />
                <span className="ml-2 text-revamp-neutral-7">Daftar dengan Akun Google Anda</span>
            </button>
        </div>
        </div>
    );
  };
  
  export default FooterBar;
  