import Card from "../components/Elements/Card";

export default function AboutPages() {
  const about = [
    {
      title: "Reservasi Online",
      description: "kapan saja dan di mana saja",
    },
    {
      title: "Fleksibel",
      description: "Pemilihan jadwal dan dokter yang fleksibel",
    },
    {
      title: "Notifikasi",
      description: "Pengingat jadwal pemeriksaan",
    },
    {
      title: "Riwayat",
      description: "pemesanan yang tersimpan rapi",
    },
  ];

  return (
    <div className="bg-white py-16 px-6" id="about">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold uppercase text-center text-[var(--primary-color)] mb-4">
          Tentang Sistem Kami
        </h2>
        <p className="text-lg text-center text-gray-700 mb-10">
          Sistem ini dikembangkan untuk memberikan kemudahan bagi pasien dalam melakukan reservasi layanan di Rumah Sakit. Keunggulan sistem ini:
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {about.map((item, idx) => (
            <Card key={idx} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </div>
  );
}
