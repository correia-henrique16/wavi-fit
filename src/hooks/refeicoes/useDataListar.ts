'use client'

import { useState } from "react"

export default function useDataListar() {
    //meter logo com o dia de hoje
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])

    return{ date, setDate }
}