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
            <section className="fixed inset-0 z-50 overflow-y-auto bg-bg p-4 flex justify-center">
                <div className="w-full max-w-md flex flex-col gap-4">
                    <button type="button" 
                        className="bg-transparent!"
                        onClick={() => {
                            setShowModalAdd(false)
                            router.replace(pathname)
                        }}
                        >
                        ← Voltar
                    </button>

                    <h2 className="text-2xl font-bold text-bordeaux text-center">Adicionar Alimentos</h2>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="alimentos-input" className="text-base font-semibold text-bordeaux">Pesquisar Alimento</label>
                        <input 
                            type="text" 
                            id="alimentos-input" 
                            placeholder="Ex: Arroz, Frango..."
                            className="w-full p-3 rounded-xl" 
                            onChange={(e) => {setPesquisaAtual(e.target.value)}}
                        />
                    </div>

                    <div className={`flex flex-col gap-2 transition-all ${showModalQtd ? "pb-72" : ""}`}>
                        <Link href={`/alimentos/?voltar=${pathname}`} 
                            className="self-center py-2 px-3 text-bordeaux font-bold text-center hover:bg-bordeaux/5 rounded-lg transition-all">
                        
                            Criar novo Alimento
                        </Link>

                        {alimentosFiltrados.map(alimento => {
                            return(
                                <button key={alimento.id} value={alimento.id}
                                    className="w-full p-3.5 bg-rosa! text-bordeaux font-bold border border-bordeaux hover:bg-rosa-escuro! hover:text-white"
                                    onClick={() => {
                                        setAlimentoSelecionado(alimento)
                                        setShowModalQtd(true)
                                    }}>{alimento.name}
                                </button>
                            )
                        })}

                        <button type="button"
                            className="self-center py-3 bg-transparent! text-bordeaux font-bold text-sm hover:underline hover:opacity-80 transition-all cursor-pointer"
                            onClick={() => setShowAmount(showAmount + 5)}>Carregar mais...
                        </button>
                    </div>

                    <ModalQuantidadeAlimentos alimentoSelecionado={alimentoSelecionado} setShowModalQtd={setShowModalQtd} showModalQtd={showModalQtd}
                    setAlimentosAdicionados={setAlimentosAdicionados} alimentosAdicionados={alimentosAdicionados}/>
                </div>
            </section>
        )
    }

    
}