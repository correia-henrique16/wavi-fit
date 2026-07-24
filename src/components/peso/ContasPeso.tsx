'use client'

import useBuscarPesoAtual from "@/hooks/userInfo/usePesoAtual"
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
        <div>
            <div>
                <h2>Peso atual</h2>
                <p>{peso} Kg</p>
            </div>
            
            <div>
                <h2>Diferença desde que começaste</h2>
                <p>{diferencaPeso} Kg</p>
            </div>

            <p>{mensagemObjetivo}</p>
        </div>
    )
}