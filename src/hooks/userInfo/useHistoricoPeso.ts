'use client'

import { useEffect, useState } from "react"
import { TipoPeso } from "@/models/db-types/TipoPeso"


export default function useBuscarHistoricoPeso() {
    const [loadigPeso, setLoading] = useState(true)
    const [historicoPeso, setHistoricoPeso] = useState<TipoPeso[]>([])

    const carregarHistoricoPeso = async () => {
        try{
            setLoading(true)

            const request = await fetch('/api/peso/historico')

            const dados = await request.json()

            setHistoricoPeso(dados)
        } catch (error) {
            throw new Error('Erro ao buscar historico')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarHistoricoPeso()
    }, [])

    return{ loadigPeso, historicoPeso }
}