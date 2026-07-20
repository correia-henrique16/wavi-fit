import Link from "next/link";

export default function BtnVoltar({caminho} : {caminho: string}) {
    return(
        <Link href={caminho} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/40 active:scale-95 transition-all duration-200 border border-castanho/10">
            <img src="/voltar.png" alt="Voltar" className="w-5 h-5 object-contain"/>
        </Link>
    )
}