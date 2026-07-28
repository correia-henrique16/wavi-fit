import Link from "next/link";

export default function BtnEditar() {
    return(
        <Link href="/profile/editar" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/40 active:scale-95 transition-all duration-200 border border-castanho/10">
            <img src="/perfil/editar.png" alt="Editar" className="w-5 h-5 object-contain"/>
        </Link>
    )
}