import Link from "next/link"
import { Alimento } from "@/models/db-types/Alimento"
import { Dispatch, SetStateAction } from "react"
import { useRouter, usePathname } from "next/navigation"
import ModalQuantidadeAlimentos from "./ModalQuantidadeAlimentos"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"

interface ChildProps {
    alimentosFiltrados: Alimento[],
    setPesquisaAtual: Dispatch<SetStateAction<string>>,
    setShowAmount: Dispatch<SetStateAction<number>>,
    showAmount: number,
    setShowModalAdd: Dispatch<SetStateAction<boolean>>,
    setShowModalQtd: Dispatch<SetStateAction<boolean>>,
    showModalAdd: boolean,
    showModalQtd: boolean,
    setAlimentoSelecionado: Dispatch<SetStateAction<Alimento | null>>,
    alimentoSelecionado: Alimento | null,
    setAlimentosAdicionados: Dispatch<SetStateAction<AlimentoRefeicao[]>>,
    alimentosAdicionados: AlimentoRefeicao[]
}

export default function ModalAdicionarAlimentos({alimentosFiltrados, setPesquisaAtual, setShowAmount, 
    showAmount, setShowModalAdd, showModalAdd, setShowModalQtd, showModalQtd, setAlimentoSelecionado, alimentoSelecionado,
    alimentosAdicionados, setAlimentosAdicionados}
    : ChildProps)
{
    
    const router = useRouter()
    const pathname = usePathname()
    
    if (showModalAdd == false) {
        return null
    } else {        
        return(
            <section className="z-10 fixed inset-0 bg-amber-50">
                <div className="relative w-full h-full">
                    <button type="button" onClick={() => {
                        setShowModalAdd(false)
                        router.replace(pathname)
                    }}>Voltar</button>

                    <h2>Adicionar Alimentos</h2>

                    <label htmlFor="alimentos-input">Pesquisar Alimento</label>
                    <input type="text" id="alimentos-input" onChange={(e) => {setPesquisaAtual(e.target.value)}}/>

                    <div className="flex flex-col gap-2">
                        <Link href="/alimentos/">Criar novo Alimento</Link>

                        {alimentosFiltrados.map(alimento => {
                            return(
                                <button key={alimento.id} value={alimento.id} onClick={() => {
                                    setAlimentoSelecionado(alimento)
                                    setShowModalQtd(true)
                                }}>{alimento.name}</button>
                            )
                        })}

                        <button type="button" onClick={() => setShowAmount(showAmount + 5)}>Carregar mais...</button>
                    </div>

                    <ModalQuantidadeAlimentos alimentoSelecionado={alimentoSelecionado} setShowModalQtd={setShowModalQtd} showModalQtd={showModalQtd}
                    setAlimentosAdicionados={setAlimentosAdicionados} alimentosAdicionados={alimentosAdicionados}/>
                </div>
            </section>
        )
    }

    
}