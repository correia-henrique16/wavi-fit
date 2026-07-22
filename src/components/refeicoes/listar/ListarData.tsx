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
        <section className="flex justify-between items-center bg-white/50 backdrop-blur-sm rounded-2xl p-2 border border-castanho/5 shadow-xs mb-6 w-full">
            <button onClick={() => setDate(anteriorDataString)} className="p-0! bg-transparent! w-8 h-8 flex items-center justify-center text-bordeaux font-bold rounded-lg hover:bg-bordeaux/5">
                &lt;
            </button>

            <div className="flex items-center justify-center gap-4 flex-1">
                <p className="text-xs font-medium text-castanho/60">{getLabel(anteriorDataString)}</p>

                <p className="text-base font-bold text-bordeaux bg-rosa/10 px-3 py-1 rounded-xl">{getLabel(dataSelecionada)}</p>

                <p className="text-xs font-medium text-castanho/60">{getLabel(proximaDataString)}</p>
            </div>

            <button onClick={() => setDate(proximaDataString)} className="p-0! bg-transparent! w-8 h-8 flex items-center justify-center text-bordeaux font-bold rounded-lg hover:bg-bordeaux/5">
                &gt;
            </button>

            {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
        </section>
    )
}