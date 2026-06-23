'use client'

import AddRefeicoes from "@/components/refeicoes/AddRefeicoes"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"
import useBuscarAlimentos from "@/hooks/alimentos/useBuscarAlimentos"
import useAdicionarAlimento from "@/hooks/refeicoes/useAdicionarAlimento"

export default function AdicionarRefeicaoPage() {

    const {loadingTipo, tipos} = useBuscarTipos()
    const {loadingAlimentos} = useBuscarAlimentos()
    const {setPesquisaAtual, alimentosFiltrados, setShowAmount, showAmount} = useAdicionarAlimento()

    if (loadingTipo || loadingAlimentos) return (<p> waitssss</p>)

    return(
        <main>
            <h1>Adicionarr refeições</h1>
            <AddRefeicoes tipos={tipos} alimentosFiltrados={alimentosFiltrados} setPesquisaAtual={setPesquisaAtual} setShowAmount={setShowAmount} showAmount={showAmount}/>
        </main>
        
    )
}