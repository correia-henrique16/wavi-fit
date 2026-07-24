import CaloriasDiarias from "@/components/inicial/CaloriasDiarias";
import ProfileBtn from "@/components/inicial/ProfileBtn";
import RefeicoesBtn from "@/components/inicial/RefeicoesBtn";
import PesoProgresso from "@/components/inicial/PesoProgresso";

export default function Home() {
  return (
    <div className="full-centered-flex min-h-screen">
      <nav>
        <div className="w-1/3 flex justify-start items-center">
          <ProfileBtn />
        </div>

        <div className="w-1/3 full-centered-flex">
          <h1>WAVI</h1>
        </div>

        <div className="w-1/3 flex justify-end items-center">
          <RefeicoesBtn />
        </div>
      </nav>

      <main>
        <CaloriasDiarias />

        <PesoProgresso />
      </main>
    </div>
  );
}
