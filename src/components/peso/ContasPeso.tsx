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

    return(
        <div className="bg-white/50 backdrop-blur-sm p-5 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4 mx-5">
            
            <div className="grid grid-cols-2 gap-3 text-center">

                <div className="bg-white/60 p-3 rounded-2xl border border-castanho/10 flex flex-col justify-between items-center min-h-[90px]">
                    <h2 className="text-s font-semibold text-castanho">
                        Peso atual
                    </h2>
                    <p className="text-2xl font-bold text-bordeaux">{peso} Kg</p>
                </div>
                
                <div className="bg-white/60 p-3 rounded-2xl border border-castanho/10 flex flex-col justify-between items-center min-h-[90px]">
                    <h2 className="text-s font-semibold text-castanho">
                        Diferença
                    </h2>
                    <p className="text-2xl font-bold text-bordeaux">
                        {diferencaPeso > 0 ? `+${diferencaPeso}` : diferencaPeso} Kg
                    </p>
                </div>

            </div>
            

            <p className="text-base font-semibold text-bordeaux text-center bg-rosa/20 p-3 rounded-xl border border-rosa/30">
                {mensagemObjetivo}
            </p>
        </div>
    )
}