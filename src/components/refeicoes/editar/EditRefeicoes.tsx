import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"
import { Refeicao } from "@/models/db-types/Refeicao"
import useEditarRefeicoes from "@/hooks/refeicoes/useEditarRefeicoes"
import MostrarCalendario from "@/components/calendario/MostrarCalendario"

interface ChildProps {
    tipos: TipoRefeicao[],
    setShowModal: Dispatch<SetStateAction<boolean>>,
    modal: string | undefined,
    alimentosAdicionados: AlimentoRefeicao[],
    refeicao: Refeicao
}

export default function EditRefeicoes({tipos, setShowModal, modal, alimentosAdicionados, refeicao}: ChildProps) {

    const {errors, formData, handleSubmit, loading, serverError, success} = useEditarRefeicoes(refeicao)

    useEffect(() => {
        if (modal == 'show') {
            setShowModal(true)
        }
    }, [modal])

    const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false)

    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(
        formData.data_refeicao ? new Date(`${formData.data_refeicao}T00:00:00`) : new Date()
    )

    const handleMudarData = (dia: Date | undefined) => {
        if (dia) {
            setDataSelecionada(dia)
            setMostrarCalendario(false)
        }
    }

    const listaErros = [
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    return(
        <form onSubmit={e => handleSubmit(e, alimentosAdicionados, refeicao.id)}
        className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4">

            <div className="text-center font-semibold text-sm"> 
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

            <div className="flex flex-col gap-1">
                <select name="tipo_refeicao" id="tipo-select" defaultValue={formData.tipo_refeicao.id} required
                className="w-full p-3 rounded-xl border-2 border-castanho/30 bg-white text-bordeaux font-bold focus:outline-none focus:border-bordeaux transition-all">
                    {tipos.map(tipo => {
                        return(
                            <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                        )
                    })}
                </select>
            </div>

            <MostrarCalendario setMostrarCalendario={setMostrarCalendario} mostrarCalendario={mostrarCalendario} dataSelecionada={dataSelecionada} handleMudarData={handleMudarData} label="Data Refeição" name="data_refeicao" />

            <div className="flex flex-col gap-1">
                <label htmlFor="name-input" className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Nome
                </label>
                <input className="w-full p-3 rounded-xl text-bordeaux font-bold" 
                type="text" name="name" id="name-input" defaultValue={formData.name} required/>
            </div>

            <button className="w-full py-3 bg-rosa! text-bordeaux font-bold border border-bordeaux/40 rounded-2xl hover:bg-rosa-escuro! hover:text-white active:scale-95 transition-all cursor-pointer text-center" 
            type="button" onClick={() => setShowModal(true)}>Adicionar alimentos</button>

            <button className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-2xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center text-base" 
            type="submit">
                {loading ? 'A submeter' : 'Submeter'}
            </button>
        </form>
    )
}