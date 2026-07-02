import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"
import { Refeicao } from "@/models/db-types/Refeicao"
import { RefeicaoAlimento } from "@/models/db-types/RefeicaoAlimento"
import calculoMacrosDia from "@/utils/calculoMacrosDia"

interface ChildProps {
    date: string
}

export default function ListarRefeicoesUser({date}: ChildProps) {

    const {refeicoes, loading, error, carregarRefeicoes} = useBuscarRefeicoes(date)

    if (loading) {
        return <p>A carregar...</p>
    }

    const {proteinaDia, carbohydratesDia, fatDia, kcalDia} = calculoMacrosDia(refeicoes)
    

    return(
        <section>
            <p>Kcal total: {kcalDia}</p>
            <p>Proteina total: {proteinaDia}</p>
            <p>Hidratos total: {carbohydratesDia}</p>
            <p>Fat total: {fatDia}</p>

            <ul>
                {refeicoes.map((refeicao: Refeicao) => 
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
        </section>  
    )
}