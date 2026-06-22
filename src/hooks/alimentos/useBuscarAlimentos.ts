import { useState, useEffect } from "react"

export default function useBuscarAlimentos() {
    const [loadingAlimentos, setLoading] = useState(true)
    const [alimentos, setAlimentos] = useState()

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