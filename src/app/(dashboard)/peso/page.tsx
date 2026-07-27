import ContasPeso from "@/components/peso/ContasPeso"
import AdicionarPeso from "@/components/peso/AdicionarPeso"
import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"
import ListarHistoricoPeso from "@/components/peso/ListarHistoricoPeso"

export default function PesoPage() {
    return(
        <div className="">

            <nav>
                <div className="w-1/3 flex justify-baseline items-center">
                    <BtnVoltar caminho='/' />
                </div>

                <div className="w-1/3 flex full-centered-flex">
                    <h1>Peso</h1>
                </div>

                <div className="w-1/3 flex justify-end items-center ">

                </div>
            </nav>            

            <main className="main-nav">

                <AdicionarPeso />

                <ContasPeso />

                <ListarHistoricoPeso />
            </main>
        </div>
    )
}