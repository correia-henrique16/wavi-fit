import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Dispatch, SetStateAction, useEffect } from "react"
import useRefeicoes from "@/hooks/refeicoes/useRefeicoes"
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao"

interface ChildProps {
    tipos: TipoRefeicao[],
    setShowModal: Dispatch<SetStateAction<boolean>>,
    modal: string | undefined,
    alimentosAdicionados: AlimentoRefeicao[]
}

export default function AddRefeicoes({tipos, setShowModal, modal, alimentosAdicionados}: ChildProps) {

    const {errors, handleSubmit, serverError, success, loading} = useRefeicoes()

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
        <form onSubmit={e => handleSubmit(e, alimentosAdicionados)}>
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
                <select name="tipo_refeicao" id="tipo-select" required>
                    {tipos.map(tipo => {
                        return(
                            <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="date-input">Data</label>
                <input type="date" id="date-input" name="data_refeicao" required/>
            </div>

            <div>
                <label htmlFor="name-input">Nome</label>
                <input type="text" name="name" id="name-input" required/>
            </div>

            <button type="button" onClick={() => setShowModal(true)}>Adicionar alimentos</button>
        </form>
    )
}