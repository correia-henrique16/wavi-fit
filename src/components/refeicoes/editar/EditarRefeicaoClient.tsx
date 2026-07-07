'use client'

import { Refeicao } from "@/models/db-types/Refeicao"
import EditRefeicoes from "./EditRefeicoes"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"
import useBuscarAlimentos from "@/hooks/alimentos/useBuscarAlimentos"
import useAdicionarAlimento from "@/hooks/refeicoes/useAdicionarAlimento"
import ModalAdicionarAlimentos from "../Modals/ModalAdicionarAlimentos"
import ListarAlimentosRefeicao from "../listar/ListarAlimentosRefeicao"
import useApagarRefeicoes from "@/hooks/refeicoes/useApagarRefeicao"
import ConfirmarApagarRefeicao from "../Modals/ConfirmarApagarRefeicao"

export default function EditarRefeicaoClient({refeicao, modal}: {refeicao: Refeicao, modal: string | undefined}) {
    const {loadingTipo, tipos} = useBuscarTipos()

    const {loadingAlimentos} = useBuscarAlimentos()

    const alimentosIniciais = refeicao.refeicao_alimentos.map(item => ({
        alimento: item.alimentos,
        quantidade: item.quantidade
    }))

    const {setPesquisaAtual, alimentosFiltrados, setShowAmount, showAmount, setShowModalAdd, showModalAdd,
        setShowModalQtd ,showModalQtd, alimentoSelecionado, setAlimentoSelecionado,
        setAlimentosAdicionados, alimentosAdicionados} = useAdicionarAlimento(alimentosIniciais)

    const {setShowConfirm, showConfirm} = useApagarRefeicoes()

    if (loadingTipo || loadingAlimentos) return (<p> waitssss</p>)

    return (
        <main>
            <button onClick={() => setShowConfirm(true)}>Apagar Refeição</button>

            <EditRefeicoes tipos={tipos} setShowModal={setShowModalAdd} modal={modal} alimentosAdicionados={alimentosAdicionados}
               refeicao={refeicao} />
            
            <ModalAdicionarAlimentos  alimentosFiltrados={alimentosFiltrados} setPesquisaAtual={setPesquisaAtual}
                setShowAmount={setShowAmount} showAmount={showAmount} setShowModalAdd={setShowModalAdd} showModalAdd={showModalAdd}
                setShowModalQtd={setShowModalQtd} showModalQtd={showModalQtd}
                setAlimentoSelecionado={setAlimentoSelecionado} alimentoSelecionado={alimentoSelecionado}
                setAlimentosAdicionados={setAlimentosAdicionados} alimentosAdicionados={alimentosAdicionados}
            /> 

            <ListarAlimentosRefeicao alimentosAdicionados={alimentosAdicionados}/>

            {showConfirm && <ConfirmarApagarRefeicao setShowConfirm={setShowConfirm} idRefeicao={refeicao.id}/>}

        </main>
    )
}