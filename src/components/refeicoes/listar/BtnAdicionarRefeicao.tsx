import Link from "next/link"

interface ChildProps {
    dataSelecionada: string
}

export default function BtnAdicionarRefeicao({dataSelecionada}: ChildProps) {
    const guardarData = () => {
        sessionStorage.setItem('data_selecionada', dataSelecionada)
    }


    return(
        <Link href={'/refeicoes/adicionar'} onClick={guardarData} className="bg-black/0 fixed bottom-15 left-1/2 -translate-x-1/2 " >
            <img src="/refeicoes/mais.png" alt="Adicionar Refeição" />
        </Link>
    )
}