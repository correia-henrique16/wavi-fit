import { useState} from "react";
import useBuscarAlimentos from "../alimentos/useBuscarAlimentos";

export default function useAdicionarAlimento() {
    const [pesquisaAtual, setPesquisaAtual] = useState('')
    const [showAmount, setShowAmount] = useState(5)

    const {alimentos} = useBuscarAlimentos()

    const listaFiltrada = alimentos.filter(alimento => alimento.name.includes(pesquisaAtual))

    const alimentosFiltrados = listaFiltrada.slice(0, showAmount)

    return{
        alimentosFiltrados, setPesquisaAtual, setShowAmount, showAmount
    }
}