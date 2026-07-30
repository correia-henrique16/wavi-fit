'use client'

import ConfirmarLogout from "../auth/Modals/ConfirmarLogout"
import useLogout from "@/hooks/auth/useLogout"

export default function LogoutBtn() {
    const { setShowConfirm, showConfirm } = useLogout()

    return (
        <div className="mx-5 mb-8">
            <button 
                type="button"
                onClick={() => setShowConfirm(true)}
                className="w-full py-3.5 bg-bordeaux/10 text-bordeaux font-bold rounded-2xl border border-bordeaux/20 hover:bg-bordeaux hover:text-white active:scale-95 transition-all cursor-pointer text-center"
            >
                Terminar Sessão
            </button>

            {showConfirm && <ConfirmarLogout setShowConfirm={setShowConfirm} />}
        </div>
    )
}