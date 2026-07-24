'use client'

import { useEffect, useState } from "react"
import { TipoUserInfo } from "@/models/db-types/TipoUserInfo"

export default function useBuscarUserInfo() {
    const [loadigUserInfo, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<TipoUserInfo>()

    const carregarUserInfo = async () => {
        try{
            setLoading(true)

            const request = await fetch('/api/userInfo')

            const dados = await request.json()

            setUserInfo(dados)
        } catch (error) {
            throw new Error('Erro ao buscar info')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarUserInfo()
    }, [])

    return{ loadigUserInfo, userInfo }
}