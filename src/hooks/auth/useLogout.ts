'use client'

import { useState } from "react";

export default function useLogout() {
    const [showConfirm, setShowConfirm] = useState(false)

    return{
        showConfirm, setShowConfirm
    }
}