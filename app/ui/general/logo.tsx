import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/general/fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none w-full h-full`}
    >
      <p className="text-[44px] font-bold w-full h-full flex items-center justify-center">Tips</p>
    </div>
  );
}
