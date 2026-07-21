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
import BtnVoltar from "../ui/BtnVoltar"

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
        <div>
            <nav>
                <div className="w-1/3 flex justify-baseline items-center">
                    <BtnVoltar caminho='/refeicoes' />
                </div>

                <div className="w-1/3 flex full-centered-flex">
                    <h1>Editar</h1>
                </div>

                <div className="w-1/3 flex justify-end items-center ">
                    <button onClick={() => setShowConfirm(true)}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-red-100! text-red-700 text-xs font-bold border border-red-300 rounded-xl hover:bg-red-200! active:scale-95 transition-all cursor-pointer">
                        <img src="/cesto-de-lixo.png" alt="Apagar" className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            <main className="main-nav max-w-md mx-auto p-4 flex flex-col gap-4 min-h-screen">

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
        </div>
        
    )
}