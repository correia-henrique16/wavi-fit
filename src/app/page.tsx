import CaloriasDiarias from "@/components/inicial/CaloriasDiarias";
import ProfileBtn from "@/components/inicial/ProfileBtn";
import RefeicoesBtn from "@/components/inicial/RefeicoesBtn";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <nav className="bg-amber-500">
        <div className="w-1/3 flex justify-baseline items-center">
          <ProfileBtn />
        </div>

        <div className="w-1/3 centered-flex">
          <h1>WAVI</h1>
        </div>

        <div className="w-1/3 flex justify-end items-center">
          <RefeicoesBtn />
        </div>
      </nav>

      <main>
        <CaloriasDiarias />
      </main>
    </div>
  );
}
