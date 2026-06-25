import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Dispatch, SetStateAction, useEffect } from "react"

interface ChildProps {
    tipos: TipoRefeicao[],
    setShowModal: Dispatch<SetStateAction<boolean>>,
    modal: string | undefined
}

export default function AddRefeicoes({tipos, setShowModal, modal}: ChildProps) {

    useEffect(() => {
        if (modal == 'show') {
            setShowModal(true)
        }
    }, [modal])

    return(
        <form action="">
            <div>
                <label htmlFor="tipo-select"></label>
                <select name="" id="tipo-select">
                    {tipos.map(tipo => {
                        return(
                            <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="date-input">Data</label>
                <input type="date" id="date-input" />
            </div>

            <div>
                <label htmlFor="name-input">Nome</label>
                <input type="text" name="" id="name-input" />
            </div>

            <button type="button" onClick={() => setShowModal(true)}>Adicionar alimentos</button>
        </form>
    )
}