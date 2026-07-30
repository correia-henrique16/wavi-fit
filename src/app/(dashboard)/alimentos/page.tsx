import AddAlimentoForm from "@/components/alimentos/AddAlimentoForm"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export default async function AlimentosPage() {

    return (
        <Suspense fallback={<p>A carregar...</p>}>
            <AddAlimentoForm />
        </Suspense>
                        
    )
}