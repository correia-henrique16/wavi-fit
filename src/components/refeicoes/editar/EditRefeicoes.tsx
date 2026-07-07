import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Dispatch, SetStateAction, useEffect } from "react"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"
import { Refeicao } from "@/models/db-types/Refeicao"
import useEditarRefeicoes from "@/hooks/refeicoes/useEditarRefeicoes"

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

    const listaErros = [
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    return(
        <form onSubmit={e => handleSubmit(e, alimentosAdicionados, refeicao.id)}>
            <button type="submit">{loading ? 'A submeter' : 'Submeter'}</button>

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

            <div>
                <label htmlFor="tipo-select"></label>
                <select name="tipo_refeicao" id="tipo-select" defaultValue={formData.tipo_refeicao.id} required>
                    {tipos.map(tipo => {
                        return(
                            <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="date-input">Data</label>
                <input type="date" id="date-input" name="data_refeicao" defaultValue={formData.data_refeicao} required/>
            </div>

            <div>
                <label htmlFor="name-input">Nome</label>
                <input type="text" name="name" id="name-input" defaultValue={formData.name} required/>
            </div>

            <button type="button" onClick={() => setShowModal(true)}>Adicionar alimentos</button>
        </form>
    )
}