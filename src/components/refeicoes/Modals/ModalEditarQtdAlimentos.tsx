import { Alimento } from "@/models/db-types/Alimento"
import useAdicionarAlimento from "@/hooks/refeicoes/useAdicionarAlimento"
import { Dispatch, SetStateAction, useEffect } from "react"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"

interface ChildProps {
    alimentoSelecionado: Alimento | null,
    setShowModalEditarQtd: Dispatch<SetStateAction<boolean>>,
    showModalEditarQtd: boolean,
    setAlimentosAdicionados: Dispatch<SetStateAction<AlimentoRefeicao[]>>,
    alimentosAdicionados: AlimentoRefeicao[],
    quantidadeEditar: number
}

export default function ModalEditarQtdAlimentos({alimentoSelecionado, setShowModalEditarQtd, showModalEditarQtd,
    setAlimentosAdicionados, alimentosAdicionados, quantidadeEditar
}: ChildProps) {

    const {quantidade, setQuantidade} = useAdicionarAlimento()

    useEffect(() => {
        if (showModalEditarQtd) {
            setQuantidade(quantidadeEditar)
        }
    }, [showModalEditarQtd, quantidadeEditar])

    const handleRemover = () => {
        setAlimentosAdicionados(
            alimentosAdicionados.filter(
                item => item.alimento?.id !== alimentoSelecionado?.id
            )
        )
        setShowModalEditarQtd(false)
    }

    const handleEditar = () => {
        setAlimentosAdicionados(
            alimentosAdicionados.map(item => {
                if (item.alimento?.id === alimentoSelecionado?.id) {
                    return {
                        ...item,
                        quantidade: quantidade
                    }
                }
                return item
            })
        )
        setShowModalEditarQtd(false)
    }

    if (showModalEditarQtd == false) {
        return null
    } else {
        return(
            <section className="fixed bottom-0 left-0 right-0 z-50 flex flex-col p-6 bg-nav-bg rounded-t-3xl border-t-2 border-bordeaux/20 shadow-2xl gap-4 max-w-md mx-auto">
                <div className="flex justify-between items-center w-full gap-2 pb-3 border-b border-bordeaux/10">
                    <button className="px-3.5 py-1.5 font-bold text-sm text-bg! bg-bordeaux rounded-xl shrink-0 text-center w-1/4"
                     onClick={() => {
                        setShowModalEditarQtd(false)
                    }}>Fechar</button>

                    <h3 className="text-lg font-bold text-bordeaux text-center truncate flex-1 px-1">{alimentoSelecionado?.name}</h3>

                    <button type="button" className="px-3.5 py-1.5 font-bold text-sm text-bg! bg-bordeaux rounded-xl shrink-0 text-right w-1/4 flex justify-end"
                     onClick={() => handleEditar()}>Editar</button>
                </div>
                
                <button className=""
                 onClick={() => handleRemover()}>
                    Remover
                </button>

                <label htmlFor="qtd-input">Quantidade (x100g)</label>
                <input type="number" id="qtd-input" min="0.01" max="1000000"
                    className="w-full p-3 rounded-xl text-bordeaux font-bold text-center text-lg"
                    value={quantidade == 0 ? "" : quantidade}
                    onChange={(e) => setQuantidade(e.target.value == "" ? 0 : Number(e.target.value))}
                />
            
                <div className="grid grid-cols-4 gap-2 text-center bg-rosa/50 p-3 rounded-2xl border border-bordeaux/20">
                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-bold text-castanho uppercase">Calorias</h4>
                        <p className="text-base font-extrabold text-bordeaux">{alimentoSelecionado ? alimentoSelecionado.kcal * quantidade : null}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-bold text-castanho uppercase">Hidratos</h4>
                        <p className="text-base font-extrabold text-bordeaux">{alimentoSelecionado ? alimentoSelecionado.carbohydrates * quantidade : null}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-bold text-castanho uppercase">Proteina</h4>
                        <p className="text-base font-extrabold text-bordeaux">{alimentoSelecionado ? alimentoSelecionado.protein * quantidade : null}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-bold text-castanho uppercase">Gordura</h4>
                        <p className="text-base font-extrabold text-bordeaux">{alimentoSelecionado ? alimentoSelecionado.fat * quantidade : null}</p>
                    </div>
                </div>
            </section>
        )
    }

    
}