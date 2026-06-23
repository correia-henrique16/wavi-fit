'use client'

import { useEffect, useState } from "react"
import { TipoRefeicao } from "@/models/db-types/TipoRefeicao"

export default function useBuscarTipos() {
    const [loadingTipo, setLoading] = useState(true)
    const [tipos, setTipos] = useState<TipoRefeicao[]>([])

    const carregarTipos = async () => {
        try{
            setLoading(true)

            const request = await fetch('/api/tipos')

            const dados = await request.json()

            setTipos(dados)
        } catch (error) {
            throw new Error('Erro ao buscar tipos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarTipos()
    }, [])

    return{ loadingTipo, tipos }
}