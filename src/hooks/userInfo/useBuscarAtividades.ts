'use client'

import { useEffect, useState } from "react"
import { TipoAtividade } from "@/models/db-types/TipoAtividade"

export default function useBuscarAtividades() {
    const [loadingAtividade, setLoading] = useState(true)
    const [atividades, setAtividades] = useState<TipoAtividade[]>([])

    const carregarAtividades = async () => {
        try{
            setLoading(true)

            const request = await fetch('/api/atividades')

            const dados = await request.json()

            setAtividades(dados)
        } catch (error) {
            throw new Error('Erro ao buscar atividades')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarAtividades()
    }, [])

    return{ loadingAtividade, atividades }
}