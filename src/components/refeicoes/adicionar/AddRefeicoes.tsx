import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useRefeicoes from "@/hooks/refeicoes/useRefeicoes"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"
import MostrarCalendario from "@/components/calendario/MostrarCalendario"

interface ChildProps {
    tipos: TipoRefeicao[],
    setShowModal: Dispatch<SetStateAction<boolean>>,
    modal: string | undefined,
    alimentosAdicionados: AlimentoRefeicao[],
    setMostrarCalendario: Dispatch<SetStateAction<boolean>>,
    mostrarCalendario: boolean,
    dataSelecionada: Date | undefined,
    setDataSelecionada: Dispatch<SetStateAction<Date | undefined>>,
    handleMudarData: (dia: Date | undefined) => void
}

export default function AddRefeicoes({tipos, setShowModal, modal, alimentosAdicionados, mostrarCalendario, setMostrarCalendario, dataSelecionada, setDataSelecionada, handleMudarData}: ChildProps) {

    const {errors, handleSubmit, serverError, success, loading} = useRefeicoes()

    useEffect(() => {
        const dataGuardada = sessionStorage.getItem('data_selecionada')
        if (dataGuardada) {
            setDataSelecionada(new Date(dataGuardada))
        }
    }, [])

    useEffect(() => {
        if (modal == 'show') {
            setShowModal(true)
        }
    }, [modal])

    const listaErros = [
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    return(
        <form onSubmit={e => handleSubmit(e, alimentosAdicionados)}
         className="flex flex-col gap-4 bg-white/50 backdrop-blur-sm p-5 rounded-2xl border border-bordeaux/20 shadow-xs mt-4"
        >

            <div> 
                {listaErros.length > 0 && (
                    <p className="text-red-500 text-sm font-medium">
                        {listaErros[0]}
                    </p>
                )}

                {success != '' && (
                    <p className="text-green-500 text-sm font-medium">
                        {success}
                    </p>
                )}
            </div>

            <MostrarCalendario setMostrarCalendario={setMostrarCalendario} mostrarCalendario={mostrarCalendario} dataSelecionada={dataSelecionada} handleMudarData={handleMudarData} />

            <div>
                <label htmlFor="tipo-select"></label>
                <select name="tipo_refeicao" id="tipo-select" required className="w-full p-3 rounded-xl bg-white border border-bordeaux/30 text-bordeaux font-bold focus:outline-none">
                    {tipos.map(tipo => {
                        return(
                            <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="name-input" className="text-base text-bordeaux font-bold">Nome</label>
                <input type="text" name="name" id="name-input" required className="w-full p-3 rounded-xl bg-white border border-bordeaux/30 text-bordeaux font-medium focus:outline-none m-0!"/>
            </div>

            <button type="button" onClick={() => setShowModal(true)} 
            className="w-full py-3 bg-rosa text-bordeaux font-bold rounded-xl border border-bordeaux/20 active:scale-95 transition-all text-center"
            >
                Adicionar alimentos
            </button>
            
            <button type="submit" className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl shadow-md active:scale-95 transition-all mt-2">
                {loading ? 'A submeter' : 'Submeter'}
            </button>
        </form>
    )
}