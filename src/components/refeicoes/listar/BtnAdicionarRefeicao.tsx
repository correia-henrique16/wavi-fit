import Link from "next/link"

interface ChildProps {
    dataSelecionada: string
}

export default function BtnAdicionarRefeicao({dataSelecionada}: ChildProps) {
    const guardarData = () => {
        sessionStorage.setItem('data_selecionada', dataSelecionada)
    }


    return(
        <Link href={'/refeicoes/adicionar'} onClick={guardarData} className="fixed left-1/2 -translate-x-1/2 bottom-6 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 z-40" >
            <img className="w-14 h-14" src="/refeicoes/mais.png" alt="Adicionar Refeição" />
        </Link>
    )
}