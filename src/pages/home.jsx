import FormPages from "../components/Elements/Form";
import Swipper from "../components/Fragments/Swipper";
import AboutPages from "./about";
import { Link } from "react-router";
import Card from "../components/Elements/Card";

export default function HomePages() {
  const card = [
    {
      title: "Reservasi Layanan Medis",
      description: "Pesan layanan pemeriksaan atau konsultasi dokter secara mudah dan cepat.",
    },
    {
      title: "Penjadwalan Kunjungan",
      description: "Atur jadwal kunjungan Anda ke rumah sakit sesuai waktu yang diinginkan.",
    },
    {
      title: "Tanpa Antrean Panjang",
      description: "Nikmati layanan pemesanan online dan hindari antrean di loket rumah sakit.",
    },
  ];

  return (
    <div className="relative bg-gray-50" id="home">
      <Swipper />

      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold uppercase text-center text-[var(--primary-color)]">
          Selamat Datang di Sistem Pemesanan Layanan Rumah Sakit
        </h1>
        <p className="text-lg text-center mt-4 mb-10 text-gray-700">
          Sistem ini membantu Anda mengakses layanan kesehatan secara efisien melalui pemesanan online. Berikut beberapa fitur utama yang kami sediakan:
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {card.map((card, idx) => (
            <Card key={idx} title={card.title} description={card.description} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-lg">
            Siap untuk mulai?{" "}
            <Link to="/register" className="font-bold text-[var(--primary-color)] hover:underline">
              Pendaftaran
            </Link>{" "}
            atau{" "}
            <Link to="/login" className="font-bold text-[var(--primary-color)] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <AboutPages />
    </div>
  );
}
