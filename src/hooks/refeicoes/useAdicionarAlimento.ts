import { useState} from "react";
import useBuscarAlimentos from "../alimentos/useBuscarAlimentos";
import { Alimento } from "@/models/db-types/Alimento";
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao";

export default function useAdicionarAlimento() {
    const [pesquisaAtual, setPesquisaAtual] = useState('')
    const [showAmount, setShowAmount] = useState(5)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalQtd, setShowModalQtd] = useState(false)
    const [alimentoSelecionado, setAlimentoSelecionado] = useState<Alimento | null>(null)

    const [quantidade, setQuantidade] = useState(1)

    const [alimentosAdicionados, setAlimentosAdicionados] = useState<AlimentoRefeicao[]>([])

    const {alimentos} = useBuscarAlimentos()

    const listaFiltrada = alimentos.filter(alimento => alimento.name.toLowerCase().includes(pesquisaAtual.toLowerCase()))

    const alimentosFiltrados = listaFiltrada.slice(0, showAmount)

    return{
        alimentosFiltrados, setPesquisaAtual, setShowAmount, showAmount,
         setShowModalAdd, showModalAdd, setShowModalQtd, showModalQtd,
         alimentoSelecionado, setAlimentoSelecionado,
         quantidade, setQuantidade,
         alimentosAdicionados, setAlimentosAdicionados
    }
}