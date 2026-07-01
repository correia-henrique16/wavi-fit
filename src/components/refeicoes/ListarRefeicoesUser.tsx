'use client'

import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"

export default function ListarRefeicoesUser() {

    const {refeicoes, loading, error, carregarRefeicoes} = useBuscarRefeicoes()

    if (loading) {
        return <p>A carregar...</p>
    }

    return(

        <ul>
            {refeicoes.map((refeicao: any) => 
                <li key={refeicao.id}>
                    <h2>{refeicao.name}</h2>
                    
                    {refeicao.refeicao_alimentos.map((alimento: any) => (
                        <div key={alimento.id}>
                            <p>{alimento.alimentos.name}</p>
                            <p>{alimento.quantidade}g</p>
                        </div>
                    ))}
                    
                    <p>{refeicao.data_refeicao}</p>
                </li>
            )}
        </ul>
    )
}