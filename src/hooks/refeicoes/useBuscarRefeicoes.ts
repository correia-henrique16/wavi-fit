'use client'

import { useState, useEffect } from "react"

export default function useBuscarRefeicoes() {
    const [refeicoes, setRefeicoes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    const carregarRefeicoes = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/refeicoes')
            
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
    }, [])

    return {
        refeicoes,
        loading,
        error,
        carregarRefeicoes
    }
}