import { Refeicao } from "@/models/db-types/Refeicao"
import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import calculoMacrosDia from "@/utils/calculos/calculoMacrosDia"
import calculoMacrosRefeicao from "@/utils/calculos/calculoMacrosRefeicao"
import Link from "next/link"

interface ChildProps {
    refeicoes: Refeicao[],
    tipos: TipoRefeicao[],
    loading: boolean,
    loadingTipo: boolean
}

export default function ListarRefeicoesUser({refeicoes, tipos, loading, loadingTipo}: ChildProps) {

    if (loading || loadingTipo) {
        return(
            <p>A carregar...</p>
        )
    }
    
    return(
        <section className="centered-col gap-3">
            {tipos.map((tipo: TipoRefeicao) => {
                const refeicoesDoTipo = refeicoes.filter(refeicao => refeicao.tipo_refeicao.id == tipo.id)
                const macrosDoTipo = calculoMacrosDia(refeicoesDoTipo)

                return(
                    <div key={tipo.id} className="border bg-amber-300 w-full text-center">
                        <div>
                            <h2>{tipo.tipo}</h2>
                            <p>{macrosDoTipo.kcalDia}</p>
                        </div>
                        

                        <ul className="border bg-amber-400">
                            {refeicoesDoTipo
                                .map((refeicao: Refeicao) => {
                                    const alimentosConvertidos = refeicao.refeicao_alimentos.map(item => ({
                                        alimento: item.alimentos,
                                        quantidade: item.quantidade
                                    }))
                                    const macrosRefeicao = calculoMacrosRefeicao(alimentosConvertidos)

                                    return(
                                        <li key={refeicao.id}>
                                            <Link href={`/refeicoes/${refeicao.id}`}>
                                                <h2>{refeicao.name}</h2>
                                                <span>{macrosRefeicao.kcalRefeicao}kcal</span>
                                            </Link>
                                        </li>
                                    )          
                                })}
                        </ul>
                    </div>
                )
            })}


        </section>  
    )
}