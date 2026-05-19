'use client'

import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"

export default function ListarRefeicoesUser() {

    const {refeicoes, loading, error, carregarRefeicoes} = useBuscarRefeicoes()
    
    console.log(refeicoes)

    return(
        <ul>
            {refeicoes.map(refeicao => 
                <li key={refeicao.id}>
                    <h2>{refeicao.name}</h2>
                    <p>{refeicao.created_at}</p>
                </li>
            )}
        </ul>
    )
}