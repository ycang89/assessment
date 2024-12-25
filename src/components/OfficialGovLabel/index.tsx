import Image from "next/image";

export default function Index() {
  return (
    <header className="bg-[#f0f0f0] py-1">
      <div className="px-2 xl:px-0 max-w-[1120px] mx-auto text-[10px] flex ">
        <Image src="/logo.svg" width={13} height={16} alt="logo" />
        <p className="pl-2">An Official Website of the <b>Singapore Government</b></p>
      </div>
    </header>
  );
}
