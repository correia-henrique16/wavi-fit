import { Alimento } from "@/models/db-types/Alimento"
import useAdicionarAlimento from "@/hooks/refeicoes/useAdicionarAlimento"
import { Dispatch, SetStateAction } from "react"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"

interface ChildProps {
    alimentoSelecionado: Alimento | null,
    setShowModalQtd: Dispatch<SetStateAction<boolean>>,
    showModalQtd: boolean,
    setAlimentosAdicionados: Dispatch<SetStateAction<AlimentoRefeicao[]>>,
    alimentosAdicionados: AlimentoRefeicao[]
}

export default function ModalQuantidadeAlimentos({alimentoSelecionado, setShowModalQtd, showModalQtd,
    setAlimentosAdicionados, alimentosAdicionados
}: ChildProps) {

    const {quantidade, setQuantidade} = useAdicionarAlimento()

    if (showModalQtd == false) {
        return null
    } else {
        return(
            <section className="absolute bottom-0 flex flex-col border-t-2 border-black w-full bg-amber-100">
                <button onClick={() => {
                    setShowModalQtd(false)
                    setQuantidade(1)
                }}>Fechar</button>

                <button type="button" onClick={() => {
                    setAlimentosAdicionados([...alimentosAdicionados, {
                        alimento: alimentoSelecionado,
                        quantidade: quantidade
                    }])
                }}>Registar</button>

                <h3>{alimentoSelecionado?.name}</h3>

                <label htmlFor="qtd-input">Quantidade (x100g)</label>
                <input type="number" id="qtd-input" min="0.01" max="1000000" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}/>
            
                <div>
                    <div>
                        <h4>Calorias</h4>
                        <p>{alimentoSelecionado ? alimentoSelecionado.kcal * quantidade : null}</p>
                    </div>

                    <div>
                        <h4>Hidratos</h4>
                        <p>{alimentoSelecionado ? alimentoSelecionado.carbohydrates * quantidade : null}</p>
                    </div>

                    <div>
                        <h4>Proteina</h4>
                        <p>{alimentoSelecionado ? alimentoSelecionado.protein * quantidade : null}</p>
                    </div>

                    <div>
                        <h4>Gordura</h4>
                        <p>{alimentoSelecionado ? alimentoSelecionado.fat * quantidade : null}</p>
                    </div>
                </div>
            </section>
        )
    }

    
}