'use client'

import AddRefeicoes from "@/components/refeicoes/adicionar/AddRefeicoes"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"
import useBuscarAlimentos from "@/hooks/alimentos/useBuscarAlimentos"
import useAdicionarAlimento from "@/hooks/refeicoes/useAdicionarAlimento"
import ModalAdicionarAlimentos from "@/components/refeicoes/Modals/ModalAdicionarAlimentos"
import ListarAlimentosRefeicao from "../listar/ListarAlimentosRefeicao"
import BtnVoltar from "../ui/BtnVoltar"
import { useState } from "react"

export default function AddRefeicaoClient({modal} : {modal:string | undefined}) {

    const {loadingTipo, tipos} = useBuscarTipos()

    const {loadingAlimentos} = useBuscarAlimentos()

    const [mostrarCalendario, setMostrarCalendario] = useState(false)
    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date())
    
    const {setPesquisaAtual, alimentosFiltrados, setShowAmount, showAmount, setShowModalAdd, showModalAdd,
        setShowModalQtd ,showModalQtd, alimentoSelecionado, setAlimentoSelecionado,
        setAlimentosAdicionados, alimentosAdicionados} = useAdicionarAlimento()

    const handleMudarData = (dia: Date | undefined) => {
        if (dia) {
            setDataSelecionada(dia)
            setMostrarCalendario(false)
        }
    }

    if (loadingTipo || loadingAlimentos) return (<p> waitssss</p>)

    return(
        <div onClick={() => mostrarCalendario && setMostrarCalendario(false)}>

            <nav>
                <div className="w-1/3 flex justify-baseline items-center">
                    <BtnVoltar caminho='/refeicoes' />
                </div>

                <div className="w-1/3 flex full-centered-flex">
                    <h1>Refeições</h1>
                </div>

                <div className="w-1/3 flex justify-end items-center ">

                </div>
            </nav>

            <main className="main-nav max-w-md mx-auto min-h-screen">
                <AddRefeicoes tipos={tipos} setShowModal={setShowModalAdd} modal={modal} alimentosAdicionados={alimentosAdicionados}
                    mostrarCalendario={mostrarCalendario} setMostrarCalendario={setMostrarCalendario} dataSelecionada={dataSelecionada}
                    setDataSelecionada={setDataSelecionada} handleMudarData={handleMudarData}
                />
            
                <ModalAdicionarAlimentos  alimentosFiltrados={alimentosFiltrados} setPesquisaAtual={setPesquisaAtual}
                    setShowAmount={setShowAmount} showAmount={showAmount} setShowModalAdd={setShowModalAdd} showModalAdd={showModalAdd}
                    setShowModalQtd={setShowModalQtd} showModalQtd={showModalQtd}
                    setAlimentoSelecionado={setAlimentoSelecionado} alimentoSelecionado={alimentoSelecionado}
                    setAlimentosAdicionados={setAlimentosAdicionados} alimentosAdicionados={alimentosAdicionados}
                /> 

                <ListarAlimentosRefeicao alimentosAdicionados={alimentosAdicionados}/>
            </main>
        </div>
        
    )
}