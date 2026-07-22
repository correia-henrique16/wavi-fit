import Link from "next/link"

interface ChildProps {
    dataSelecionada: string
}

export default function BtnAdicionarRefeicao({dataSelecionada}: ChildProps) {
    const guardarData = () => {
        sessionStorage.setItem('data_selecionada', dataSelecionada)
    }


    return(
        <Link href={'/refeicoes/adicionar'} onClick={guardarData} 
        className="bg-bordeaux fixed left-1/2 -translate-x-1/2 bottom-6 hover:scale-105 active:scale-95 transition-all duration-200 z-40 p-3 rounded-full" >
            <img className="w-10 h-10" src="/refeicoes/mais.png" alt="Adicionar Refeição" />
        </Link>
    )
}