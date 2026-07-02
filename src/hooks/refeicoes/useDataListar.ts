'use client'

import { useState } from "react"

export default function useDataListar() {
    const [date, setDate] = useState(new Date())

    return{ date, setDate }
}