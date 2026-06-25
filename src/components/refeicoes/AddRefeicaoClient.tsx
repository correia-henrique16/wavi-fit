'use client'

import AddRefeicoes from "@/components/refeicoes/AddRefeicoes"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"
import useBuscarAlimentos from "@/hooks/alimentos/useBuscarAlimentos"
import useAdicionarAlimento from "@/hooks/refeicoes/useAdicionarAlimento"
import ModalAdicionarAlimentos from "@/components/refeicoes/Modals/ModalAdicionarAlimentos"
import ListarAlimentosRefeicao from "./ListarAlimentosRefeicao"

export default function AddRefeicaoClient({modal} : {modal:string | undefined}) {

    const {loadingTipo, tipos} = useBuscarTipos()
    const {loadingAlimentos} = useBuscarAlimentos()
    const {setPesquisaAtual, alimentosFiltrados, setShowAmount, showAmount, setShowModalAdd, showModalAdd,
        setShowModalQtd ,showModalQtd, alimentoSelecionado, setAlimentoSelecionado,
        setAlimentosAdicionados, alimentosAdicionados} = useAdicionarAlimento()

    if (loadingTipo || loadingAlimentos) return (<p> waitssss</p>)

    return(
        <main>
            <h1>Adicionarr refeições</h1>
            
            <AddRefeicoes tipos={tipos} setShowModal={setShowModalAdd} modal={modal} alimentosAdicionados={alimentosAdicionados}/>
            
            <ModalAdicionarAlimentos  alimentosFiltrados={alimentosFiltrados} setPesquisaAtual={setPesquisaAtual}
                setShowAmount={setShowAmount} showAmount={showAmount} setShowModalAdd={setShowModalAdd} showModalAdd={showModalAdd}
                setShowModalQtd={setShowModalQtd} showModalQtd={showModalQtd}
                setAlimentoSelecionado={setAlimentoSelecionado} alimentoSelecionado={alimentoSelecionado}
                setAlimentosAdicionados={setAlimentosAdicionados} alimentosAdicionados={alimentosAdicionados}
            /> 

            <ListarAlimentosRefeicao alimentosAdicionados={alimentosAdicionados}/>
        </main>
        
    )
}