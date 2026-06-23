import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Alimento } from "@/models/db-types/Alimento"

export default function AddRefeicoes({tipos, alimentos}: {tipos: TipoRefeicao[], alimentos:Alimento[]}) {
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
        </form>
    )
}