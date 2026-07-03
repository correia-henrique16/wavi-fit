import { Dispatch, SetStateAction } from "react"
import apagarRefeicao from "@/utils/crud/apagarRefeicao"
import { useRouter } from "next/navigation"

export default function ConfirmarApagarRefeicao({setShowConfirm, idRefeicao}: {idRefeicao: number, setShowConfirm: Dispatch<SetStateAction<boolean>>}) {
    const router = useRouter()
    return(
        <section className="z-50 w-screen h-screen bg-black/80 inset-0 absolute">
            <div>
                <span>Quer apagar a refeição?</span>

                <div>
                    <button onClick={() => apagarRefeicao(idRefeicao, router)}>Sim</button>
                    <button onClick={() => setShowConfirm(false)}>Não</button>
                </div>
            </div>
        </section>
    )
}