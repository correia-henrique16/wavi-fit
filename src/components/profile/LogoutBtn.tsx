'use client'

import ConfirmarLogout from "../auth/Modals/ConfirmarLogout"
import useLogout from "@/hooks/auth/useLogout"

export default function LogoutBtn() {
    const {setShowConfirm, showConfirm} = useLogout()
    return(
        <div>
            <button onClick={() => setShowConfirm(true)}>
                Logout
            </button>

            {showConfirm && <ConfirmarLogout setShowConfirm={setShowConfirm} />}
        </div>
    )
}