import Link from "next/link";

export default function BtnVoltar() {
    return(
        <Link href="/" className="w-13 centered-flex">
            <img src="/voltar.png" alt="Voltar" />
        </Link>
    )
}