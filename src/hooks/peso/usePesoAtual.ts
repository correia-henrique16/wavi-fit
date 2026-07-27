'use client'

import { useEffect, useState } from "react"
import { TipoPeso } from "@/models/db-types/TipoPeso"

export default function useBuscarPesoAtual() {
    const [loadingPesoAtual, setLoading] = useState(true)
    const [pesoAtual, setPesoAtual] = useState<TipoPeso>()

    const carregarPesoAtual = async () => {
        try{
            setLoading(true)

            const request = await fetch('/api/peso/atual')

            const dados = await request.json()

            setPesoAtual(dados)
        } catch (error) {
            throw new Error('Erro ao buscar peso atual')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarPesoAtual()
    }, [])

    return{ loadingPesoAtual, pesoAtual }
}