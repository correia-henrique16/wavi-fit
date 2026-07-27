'use client'

import { useState } from "react";

export default function useApagarPeso() {
    const [showConfirm, setShowConfirm] = useState(false)

    return{
        showConfirm, setShowConfirm
    }
}