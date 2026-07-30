import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"
import calculoMacrosRefeicao from "@/utils/calculos/calculoMacrosRefeicao"
import { Dispatch, SetStateAction, useState } from "react"
import ModalEditarQtdAlimentos from "../Modals/ModalEditarQtdAlimentos"
import { Alimento } from "@/models/db-types/Alimento"

interface ChildProps {
    alimentosAdicionados: AlimentoRefeicao[],
    showModalEditarQtd: boolean ,
    setShowModalEditarQtd: Dispatch<SetStateAction<boolean>>,
    setAlimentosAdicionados: Dispatch<SetStateAction<AlimentoRefeicao[]>>,
}

export default function ListarAlimentosRefeicao({alimentosAdicionados, setAlimentosAdicionados, showModalEditarQtd, setShowModalEditarQtd}: ChildProps) {

    const [quantidadeEditar, setQuantidadeEditar] = useState<number>(0)
    const [alimentoSelecionado, setAlimentoSelecionado] = useState<Alimento | null>(null)

    const handleSelecionar = (alimentoAdded: AlimentoRefeicao) => {
        setAlimentoSelecionado(alimentoAdded.alimento)
        setQuantidadeEditar(alimentoAdded.quantidade)
        setShowModalEditarQtd(true)
    }

    if(alimentosAdicionados.length < 1) {
        return null
    } else {
        const {carbohydratesRefeicao, gorduraRefeicao, kcalRefeicao, proteinaRefeicao} = calculoMacrosRefeicao(alimentosAdicionados)

        return (
            <section className="flex flex-col gap-3 w-full mt-4">
                {alimentosAdicionados.map(added => {
                    return(
                        <button key={added.alimento?.id} className="mx-auto w-[92%] p-3.5 bg-rosa/50 text-bordeaux font-bold border border-bordeaux rounded-2xl flex justify-between items-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                         onClick={() => handleSelecionar(added)}>
                            <div className="flex flex-col items-start">
                                <p className="text-base font-bold text-bordeaux">{added.alimento?.name}</p>
                                <span className="text-xs font-semibold text-bordeaux/70">{added.quantidade * 100}g</span>
                            </div>
                            
                            <span className="text-base font-extrabold text-bordeaux">{added.alimento?.kcal && added.alimento.kcal * added.quantidade}kcal</span>
                        </button>
                    )
                })}

                <div className="mx-auto w-[92%] grid grid-cols-4 gap-2 text-center bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-castanho/10 shadow-xs mt-1">
                    <p className="flex flex-col items-center text-bordeaux font-bold text-sm">{kcalRefeicao}<span className="text-[10px] uppercase tracking-wider text-castanho/70 font-semibold">kcal</span></p>

                    <p className="flex flex-col items-center text-bordeaux font-bold text-sm">{carbohydratesRefeicao}g <span className="text-[10px] uppercase tracking-wider text-castanho/70 font-semibold">Hidratos</span></p>

                    <p className="flex flex-col items-center text-bordeaux font-bold text-sm">{proteinaRefeicao}g <span className="text-[10px] uppercase tracking-wider text-castanho/70 font-semibold">Proteina</span></p>

                    <p className="flex flex-col items-center text-bordeaux font-bold text-sm">{gorduraRefeicao}g <span className="text-[10px] uppercase tracking-wider text-castanho/70 font-semibold">Gordura</span></p>
                </div>

                <ModalEditarQtdAlimentos alimentoSelecionado={alimentoSelecionado} setShowModalEditarQtd={setShowModalEditarQtd} showModalEditarQtd={showModalEditarQtd}
                    setAlimentosAdicionados={setAlimentosAdicionados} alimentosAdicionados={alimentosAdicionados} quantidadeEditar={quantidadeEditar}/>
            </section>
        )
    }

    
}