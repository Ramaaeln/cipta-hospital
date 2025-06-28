import FormPages from "../Elements/Form";
import Background from "../../assets/bg-2.jpg";
import Swipper from "../Fragments/Swipper";
import AboutPages from "./about";

export default function HomePages() {
  return (
    <div className="relative">
      <div className="h-screen" id="home">
      <Swipper />
      <div className=" inset-0 z-10 flex justify-center  ">
        <h1 className="text-4xl font-bold px-6 -py-40 text-[var(--primary-color)]  ">
          PT. CIPTA HOSPITAL INDONESIA
        </h1>
      </div>
      </div>
      <AboutPages/>
    </div>
  );
}
