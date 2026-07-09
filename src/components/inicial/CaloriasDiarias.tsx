'use client'

import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"
import calculoMacrosDia from "@/utils/calculos/calculoMacrosDia"

export default function CaloriasDiarias() {
    const dataAtual = new Date().toISOString().split('T')[0]
    
    const {refeicoes, loading} = useBuscarRefeicoes(dataAtual)

    const {kcalDia} = calculoMacrosDia(refeicoes)

    if (loading) {
        return <p>A calcular...</p>
    } else {
        return(
            <div>
                <h2>Calorias Diárias</h2>
                <p>{kcalDia}</p>
            </div>
        )
    }
    
}