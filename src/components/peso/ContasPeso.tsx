'use client'

import useBuscarPesoAtual from "@/hooks/peso/usePesoAtual"
import useBuscarUserInfo from "@/hooks/userInfo/useBuscarUserInfo"
import calculoProgressoPeso from "@/utils/calculos/calculoProgressoPeso"

export default function ContasPeso() {
    const {loadingPesoAtual, pesoAtual} = useBuscarPesoAtual()
    const {userInfo, loadigUserInfo} = useBuscarUserInfo()

    if (loadingPesoAtual || loadigUserInfo) {
        return <p>Loadinggg</p>
    }

    if (!pesoAtual || !userInfo) {
        return null
    }

    const {peso, data_peso} = pesoAtual
    const {peso_objetivo, peso_inicial} = userInfo

    const diferencaPeso = peso - peso_inicial

    const mensagemObjetivo = calculoProgressoPeso({peso_inicial, peso_objetivo, peso})

    const perdeuPeso = peso_objetivo < peso_inicial
    const totalAAlterar = Math.abs(peso_inicial - peso_objetivo)
    
    const progressoReal = perdeuPeso 
        ? peso_inicial - peso 
        : peso - peso_inicial

    const percentagemPeso = totalAAlterar > 0 
        ? Math.max(0, Math.min(Math.round((progressoReal / totalAAlterar) * 100), 100)) 
        : 0

    return(
        <div className="bg-white/50 z-30 p-5 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4 m-5">
            
            <div className="grid grid-cols-2 gap-3 text-center">

                <div className="bg-white/60 p-3 rounded-2xl border border-castanho/10 flex flex-col justify-between items-center min-h-22.5">
                    <h2 className="text-s font-semibold text-castanho">
                        Peso atual
                    </h2>
                    <p className="text-2xl font-bold text-bordeaux">{peso} Kg</p>
                </div>
                
                <div className="bg-white/60 p-3 rounded-2xl border border-castanho/10 flex flex-col justify-between items-center min-h-22.5">
                    <h2 className="text-s font-semibold text-castanho">
                        Diferença
                    </h2>
                    <p className="text-2xl font-bold text-bordeaux">
                        {diferencaPeso > 0 ? `+${diferencaPeso}` : diferencaPeso} Kg
                    </p>
                </div>

            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold text-castanho">
                    <span className="uppercase tracking-wider">Progresso da Meta</span>
                    <span className="text-base font-black text-bordeaux">{percentagemPeso}%</span>
                </div>

                <div className="w-full bg-castanho/10 h-4 rounded-xl overflow-hidden p-0.5 border border-castanho/10">
                    <div 
                        className="h-full bg-bordeaux rounded-lg transition-all duration-500 shadow-sm"
                        style={{ width: `${percentagemPeso}%` }}
                    />
                </div>
            </div>

            <p className="text-base font-semibold text-bordeaux text-center bg-rosa/20 p-3 rounded-xl border border-rosa/30">
                {mensagemObjetivo}
            </p>
        </div>
    )
}