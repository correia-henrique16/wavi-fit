import { useState, useEffect } from "react"
import { Alimento } from "@/models/db-types/Alimento"

export default function useBuscarAlimentos() {
    const [loadingAlimentos, setLoading] = useState(true)
    const [alimentos, setAlimentos] = useState<Alimento[]>([])

    const carregarAlimentos = async () => {
        setLoading(true)

        try{
            const request = await fetch('/api/alimentos')

            const data = await request.json()

            setAlimentos(data)
        } catch(error: any) {
            throw new Error('Erro ao buscar alimentos', error)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        carregarAlimentos()
    }, [])

    return {
        loadingAlimentos, alimentos
    }
}