import { Link, Outlet, useLocation } from "react-router";
import Icon from "../../assets/icon.png";
import { useEffect, useState } from "react";

export default function MainLayouts() {
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  const isAtRoot = location.pathname === "/";

  const handleScrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if(location.hash) {
        const targetId = location.hash.replace('#', '');
        const el = document.getElementById(targetId);
        if(el){
            setTimeout(() =>{
        el.scrollIntoView({
            behavior : 'smooth'
        });
    },100);
    }
}
  },[location]);
 
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScroll(offset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={`p-9 items-center justify-between z-100 flex  sticky top-0  ${
          scroll
            ? "bg-[rgba(145,200,228,0.4)] backdrop-blur-md shadow"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-4">
          <img src={Icon} alt="" className="h-12" />
          <h1 className="font-bold text-2xl">CIPTA HOSPITAL INDONESIA</h1>
        </div>
        <div className="gap-2 flex">
          {isAtRoot ? (
            <button onClick={handleScrollToTop} className="cursor-pointer">
              Home
            </button>
          ) : (
            <Link to="/" className="p-1 cursor-pointer">
              Home
            </Link>
          )}

          <Link to="/#about" className="p-1">
            About
          </Link>

          <span className="p-1">|</span>
          <Link to="/login" className="  p-1">
            Login
          </Link>
          <Link to='/register' className="hover:bg-[var(--primary-color)] hover:text-white transition duration-300 ease-in-out
 rounded-sm p-1">
            Register
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
