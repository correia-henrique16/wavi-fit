import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"
import { Alimento } from "@/models/db-types/Alimento"
import { Dispatch, SetStateAction } from 'react';
import Link from "next/link";

interface ChildProps {
    tipos: TipoRefeicao[],
    alimentosFiltrados: Alimento[],
    setPesquisaAtual: Dispatch<SetStateAction<string>>,
    setShowAmount: Dispatch<SetStateAction<number>>,
    showAmount: number
}

export default function AddRefeicoes({tipos, alimentosFiltrados, setPesquisaAtual, setShowAmount, showAmount}: ChildProps) {
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


            <div>
                <label htmlFor="alimentos-input">Selecionar Alimentos</label>
                <input type="text" id="alimentos-input" onChange={(e) => {setPesquisaAtual(e.target.value)}}/>
                <div>
                    <Link href="/alimentos/">Adicionar novo Alimento</Link>

                    {alimentosFiltrados.map(alimento => {
                        return(
                            <button key={alimento.id} value={alimento.id}>{alimento.name}</button>
                            // <option key={alimento.id} value={alimento.id}>{alimento.name}</option>
                        )
                    })}

                    <button type="button" onClick={() => setShowAmount(showAmount + 5)}>Carregar mais...</button>
                </div>

                <select name="">
                    
                </select>
            </div>
        </form>
    )
}