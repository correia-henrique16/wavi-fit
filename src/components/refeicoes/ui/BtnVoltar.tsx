import Link from "next/link";

export default function BtnVoltar({caminho} : {caminho: string}) {
    return(
        <Link href={caminho} className="w-13 full-centered-flex">
            <img src="/voltar.png" alt="Voltar" />
        </Link>
    )
}