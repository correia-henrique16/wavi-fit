import { Dispatch, SetStateAction } from "react"
import datasDias from "@/utils/datas/datasDias"

interface ChildProps {
    date: string,
    setDate: Dispatch<SetStateAction<string>>
}

export default function ListarData({date, setDate}: ChildProps) {
    const {anteriorDataString, dataSelecionada, proximaDataString, getLabel} = datasDias(date)  

    return (
        <section className="w-screen centered-flex">
            <button onClick={() => setDate(anteriorDataString)} >
                &lt;
            </button>

            <div className="flex justify-center items-center gap-4 w-2/3">
                <p>{getLabel(anteriorDataString)}</p>

                <p>{getLabel(dataSelecionada)}</p>

                <p>{getLabel(proximaDataString)}</p>
            </div>

            <button onClick={() => setDate(proximaDataString)} >
                &gt;
            </button>

            {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
        </section>
    )
}