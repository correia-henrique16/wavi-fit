import { useState } from "react";

export default function useApagarRefeicoes() {
    const [showConfirm, setShowConfirm] = useState(false)

    return{
        showConfirm, setShowConfirm
    }
}