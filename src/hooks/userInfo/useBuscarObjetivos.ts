'use client'

import { useEffect, useState } from "react"
import { TipoObjetivo } from "@/models/db-types/TipoObjetivo"

export default function useBuscarObjetivos() {
    const [loadingObjetivo, setLoading] = useState(true)
    const [objetivos, setObjetivos] = useState<TipoObjetivo[]>([])

    const carregarObjetivos = async () => {
        try{
            setLoading(true)

            const request = await fetch('/api/objetivos')

            const dados = await request.json()

            setObjetivos(dados)
        } catch (error) {
            throw new Error('Erro ao buscar objetivos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarObjetivos()
    }, [])

    return{ loadingObjetivo, objetivos }
}