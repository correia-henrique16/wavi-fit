import CaloriasDiarias from "@/components/inicial/CaloriasDiarias";
import ProfileBtn from "@/components/inicial/ProfileBtn";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <nav className="bg-amber-500 p-2 px-10">
        <ProfileBtn />
      </nav>

      <main>
        <CaloriasDiarias />
      </main>
    </div>
  );
}
