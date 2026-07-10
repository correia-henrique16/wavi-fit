import { Refeicao } from "@/models/db-types/Refeicao"
import { RefeicaoAlimento } from "@/models/db-types/RefeicaoAlimento"
import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"

interface ChildProps {
    refeicoes: Refeicao[],
    tipos: TipoRefeicao[]
}

export default function ListarRefeicoesUser({refeicoes, tipos}: ChildProps) {
    
    return(
        <section>
            {tipos.map((tipo: TipoRefeicao) => 
                <div key={tipo.id}>
                    <h2>{tipo.tipo}</h2>

                    <ul>
                        {refeicoes
                            .filter(refeicao => refeicao.tipo_refeicao.id == tipo.id)
                            .map((refeicao: Refeicao) => 
                                <li key={refeicao.id}>
                                    <h2>{refeicao.name}</h2>
                                    
                                    {refeicao.refeicao_alimentos.map((alimento: RefeicaoAlimento) => (
                                        <div key={alimento.id}>
                                            <p>{alimento.alimentos.name}</p>
                                            <p>{alimento.quantidade}g</p>
                                        </div>
                                    ))}
                                    
                                    <p>{refeicao.data_refeicao}</p>
                                </li>
                            )}
                    </ul>
                </div>
            )}


        </section>  
    )
}