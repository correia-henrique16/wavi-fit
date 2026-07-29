import { Refeicao } from "@/models/db-types/Refeicao"
import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import calculoMacrosDia from "@/utils/calculos/calculoMacrosDia"
import calculoMacrosRefeicao from "@/utils/calculos/calculoMacrosRefeicao"
import {Dispatch, SetStateAction} from "react"
import Link from "next/link"

interface ChildProps {
    refeicoes: Refeicao[],
    tipos: TipoRefeicao[],
    loading: boolean,
    loadingTipo: boolean,
    refeicaoAberta: number[],
    setRefeicaoAberta: Dispatch<SetStateAction<number[]>>
}

export default function ListarRefeicoesUser({refeicoes, tipos, loading, loadingTipo, refeicaoAberta, setRefeicaoAberta}: ChildProps) {

    const handleClickTipo = (tipo_id: number) => {
        if (refeicaoAberta.includes(tipo_id)) {
            const listaAtualizada = refeicaoAberta.filter((item) => item != tipo_id)
            setRefeicaoAberta(listaAtualizada)
        } else {
            const listaAtualizada = [...refeicaoAberta, tipo_id]
            setRefeicaoAberta(listaAtualizada)
        }
    }

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
                    <div key={tipo.id} className="bg-rosa pt-3 text-center w-full rounded-t-xl border border-bordeaux"
                        onClick={() => handleClickTipo(tipo.id)}
                    >
                        <div>
                            <h2 className="text-bordeaux font-bold text-lg">{tipo.tipo}</h2>
                            <p className="text-bordeaux/80 text-lg font-semibold">{macrosDoTipo.kcalDia}</p>
                        </div>

                        
                        <ul className=" bg-rosa-claro mt-3">
                            {refeicaoAberta.includes(tipo.id) && 
                                refeicoesDoTipo.map((refeicao: Refeicao) => {
                                    const alimentosConvertidos = refeicao.refeicao_alimentos.map(item => ({
                                        alimento: item.alimentos,
                                        quantidade: item.quantidade
                                    }))
                                    const macrosRefeicao = calculoMacrosRefeicao(alimentosConvertidos)

                                    return(
                                        <li key={refeicao.id} className="border-b border-bordeaux/50 last:border-b-0">
                                            <Link href={`/refeicoes/${refeicao.id}`} onClick={(e) => e.stopPropagation()} 
                                             className="p-1 flex flex-col gap-1 items-center justify-center">
                                                <h2 className="text-bordeaux font-bold text-lg">{refeicao.name}</h2>
                                                <span className="text-base font-semibold text-bordeaux/90">{macrosRefeicao.kcalRefeicao}kcal</span>
                                            </Link>
                                        </li>
                                    )          
                                })
                            }
                        </ul>

                        
                    </div>
                )
            })}


        </section>  
    )
}