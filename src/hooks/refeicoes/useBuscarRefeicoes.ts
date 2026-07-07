'use client'

import { useState, useEffect } from "react"
import { Refeicao } from "@/models/db-types/Refeicao"

export default function useBuscarRefeicoes(date: string) {
    const [refeicoes, setRefeicoes] = useState<Refeicao[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    const carregarRefeicoes = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/refeicoes?date=${date}`)
            
            if (!response.ok) throw new Error('Erro ao ir buscar as refeições')
            
            const dados = await response.json()
            setRefeicoes(dados)
        } catch (error: any) {
            setError(error.message || 'Erro desconhecido')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarRefeicoes()
    }, [date])

    return {
        refeicoes,
        loading,
        error,
        carregarRefeicoes
    }
}