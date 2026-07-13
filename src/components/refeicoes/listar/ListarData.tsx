import { Dispatch, SetStateAction } from "react"

interface ChildProps {
    setDate: Dispatch<SetStateAction<string>>,
    anteriorDataString: string,
    dataSelecionada: string,
    proximaDataString: string,
    getLabel: (strData: string) => string
}

export default function ListarData({setDate, anteriorDataString, dataSelecionada, proximaDataString, getLabel}: ChildProps) {
    

    return (
        <section className="w-screen centered-flex mb-3 gap-2">
            <button onClick={() => setDate(anteriorDataString)} >
                &lt;
            </button>

            <div className="flex justify-center items-center gap-1 w-2/3">
                <p className="border p-1 w-1/4 box-border text-center text-xs">{getLabel(anteriorDataString)}</p>

                <p className="border p-1 w-1/2 box-border text-center text-xl">{getLabel(dataSelecionada)}</p>

                <p className="border p-1 w-1/4 box-border text-center text-xs">{getLabel(proximaDataString)}</p>
            </div>

            <button onClick={() => setDate(proximaDataString)} >
                &gt;
            </button>

            {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
        </section>
    )
}