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

export default function ModalEditarQtdAlimentos({
    alimentoSelecionado, 
    setShowModalEditarQtd, 
    showModalEditarQtd,
    setAlimentosAdicionados, 
    alimentosAdicionados, 
    quantidadeEditar
}: ChildProps) {

    const { quantidade, setQuantidade } = useAdicionarAlimento()

    useEffect(() => {
        if (showModalEditarQtd) {
            setQuantidade(quantidadeEditar)
        }
    }, [showModalEditarQtd, quantidadeEditar, setQuantidade])

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

    if (!showModalEditarQtd) {
        return null
    }

    return (
        <section className="fixed bottom-0 left-0 right-0 z-50 flex flex-col p-6 bg-nav-bg rounded-t-3xl border-t-2 border-bordeaux/20 shadow-2xl gap-4 max-w-md mx-auto">
            <div className="flex justify-between items-center w-full gap-2 pb-3 border-b border-bordeaux/10">
                <button 
                    type="button"
                    className="px-3.5 py-1.5 font-bold text-sm text-bg! bg-bordeaux rounded-xl shrink-0 text-center w-1/4"
                    onClick={() => setShowModalEditarQtd(false)}
                >
                    Fechar
                </button>

                <h3 className="text-lg font-bold text-bordeaux text-center truncate flex-1 px-1">
                    {alimentoSelecionado?.name}
                </h3>

                <button 
                    type="button" 
                    className="px-3.5 py-1.5 font-bold text-sm text-bg! bg-bordeaux rounded-xl shrink-0 text-center w-1/4"
                    onClick={handleEditar}
                >
                    Editar
                </button>
            </div>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="qtd-input" className="text-sm font-semibold text-castanho">
                    Quantidade (x100g)
                </label>
                <input 
                    type="number" 
                    id="qtd-input" 
                    min="0.01" 
                    max="1000000"
                    className="w-full p-3 rounded-xl text-bordeaux font-bold text-center text-lg bg-rosa/20 border border-bordeaux/20 focus:outline-none focus:ring-2 focus:ring-bordeaux"
                    value={quantidade === 0 ? "" : quantidade}
                    onChange={(e) => setQuantidade(e.target.value === "" ? 0 : Number(e.target.value))}
                />
            </div>

            <div className="grid grid-cols-4 gap-2 text-center bg-rosa/50 p-3 rounded-2xl border border-bordeaux/20">
                <div className="flex flex-col items-center">
                    <h4 className="text-xs font-bold text-castanho uppercase">Calorias</h4>
                    <p className="text-base font-extrabold text-bordeaux">
                        {alimentoSelecionado ? Math.round(alimentoSelecionado.kcal * quantidade) : 0}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="text-xs font-bold text-castanho uppercase">Hidratos</h4>
                    <p className="text-base font-extrabold text-bordeaux">
                        {alimentoSelecionado ? Math.round(alimentoSelecionado.carbohydrates * quantidade) : 0}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="text-xs font-bold text-castanho uppercase">Proteina</h4>
                    <p className="text-base font-extrabold text-bordeaux">
                        {alimentoSelecionado ? Math.round(alimentoSelecionado.protein * quantidade) : 0}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="text-xs font-bold text-castanho uppercase">Gordura</h4>
                    <p className="text-base font-extrabold text-bordeaux">
                        {alimentoSelecionado ? Math.round(alimentoSelecionado.fat * quantidade) : 0}
                    </p>
                </div>
            </div>

            <button 
                type="button"
                className="w-full py-3 px-4 font-bold text-sm text-white bg-bordeaux hover:bg-bordeaux/90 rounded-xl transition-colors"
                onClick={handleRemover}
            >
                Remover Alimento
            </button>
        </section>
    )
}