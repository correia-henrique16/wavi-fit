import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"
import calculoMacrosRefeicao from "@/utils/calculos/calculoMacrosRefeicao"

interface ChildProps {
    alimentosAdicionados: AlimentoRefeicao[]
}

export default function ListarAlimentosRefeicao({alimentosAdicionados}: ChildProps) {
    if(alimentosAdicionados.length < 1) {
        return null
    } else {
        const {carbohydratesRefeicao, gorduraRefeicao, kcalRefeicao, proteinaRefeicao} = calculoMacrosRefeicao(alimentosAdicionados)

        return (
            <section className="flex flex-col gap-1.5 p-5">
                {alimentosAdicionados.map(added => {
                    return(
                        <button key={added.alimento?.id} className="p-2 bg-amber-300">
                            <div>
                                <p>{added.alimento?.name}</p>
                                <span>{added.quantidade * 100}g</span>
                            </div>
                            
                            <span>{added.alimento?.kcal && added.alimento.kcal * added.quantidade}kcal</span>
                        </button>
                    )
                })}

                <div>
                    <p>{kcalRefeicao}<span>kcal</span></p>

                    <p>{carbohydratesRefeicao}g <span>Hidratos</span></p>

                    <p>{proteinaRefeicao}g <span>Proteina</span></p>

                    <p>{gorduraRefeicao}g <span>Gordura</span></p>
                </div>
            </section>
        )
    }

    
}