import Link from "next/link"

export default function BtnAdicionarRefeicao() {
    return(
        <Link href={'/refeicoes/adicionar'} className="bg-black/0 fixed bottom-15 left-1/2 -translate-x-1/2 " >
            <img src="/refeicoes/mais.png" alt="Adicionar Refeição" />
        </Link>
    )
}