import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"

interface ChildProps {
    alimentosAdicionados: AlimentoRefeicao[]
}

export default function ListarAlimentosRefeicao({alimentosAdicionados}: ChildProps) {
    if(alimentosAdicionados.length < 1) {
        return null
    } else {
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
                    <p>{alimentosAdicionados.reduce((acumulador, itemAtual) => {
                            return acumulador + (itemAtual.alimento?.kcal ?  itemAtual.alimento?.kcal * itemAtual.quantidade : 0)
                        }, 0)} <span>kcal</span>
                    </p>

                    <p>{alimentosAdicionados.reduce((acumulador, itemAtual) => {
                            return acumulador + (itemAtual.alimento?.carbohydrates ?  itemAtual.alimento?.carbohydrates * itemAtual.quantidade : 0)
                        }, 0)}g <span>Hidratos</span>
                    </p>

                    <p>{alimentosAdicionados.reduce((acumulador, itemAtual) => {
                            return acumulador + (itemAtual.alimento?.protein ?  itemAtual.alimento?.protein * itemAtual.quantidade : 0)
                        }, 0)}g <span>Proteina</span>
                    </p>

                    <p>{alimentosAdicionados.reduce((acumulador, itemAtual) => {
                            return acumulador + (itemAtual.alimento?.fat ?  itemAtual.alimento?.fat * itemAtual.quantidade : 0)
                        }, 0)}g <span>Gordura</span>
                    </p>
                </div>
            </section>
        )
    }

    
}