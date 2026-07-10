import Link from "next/link";

export default function BtnVoltar() {
    return(
        <Link href="/" className="w-13 full-centered-flex">
            <img src="/voltar.png" alt="Voltar" />
        </Link>
    )
}