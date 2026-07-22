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
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-castanho/10 shadow-sm text-center mt-6
                aspect-square flex flex-col justify-center"
            >
                <h2 className="text-sm font-semibold tracking-wider text-castanho uppercase mb-2">Calorias Diárias</h2>
                <p className="text-5xl font-black text-bordeaux tracking-tight">{kcalDia}</p>
            </div>
        )
    }
    
}