import { HeartPlus } from "lucide-react";

export default function Card({ icon: Icon, title, description }) {
  return (
    <div className="group border w-full sm:w-[300px] p-6 rounded-xl hover:bg-[var(--thrid-color)] hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 group-hover:rotate-12 transition-transform duration-300 text-3xl">
          {Icon ? <Icon /> : <HeartPlus />}
        </div>
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
