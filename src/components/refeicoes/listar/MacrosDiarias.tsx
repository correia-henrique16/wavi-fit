interface ChildProps {
    proteinaDia: number,
    carbohydratesDia: number,
    fatDia: number,
    kcalDia: number
}

export default function MacrosDiarias({proteinaDia, carbohydratesDia, fatDia, kcalDia}: ChildProps) {
    return(
        <div className="mx-auto w-[92%] grid grid-cols-4 gap-2 text-center bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-castanho/10 shadow-xs mt-5">
            <p className="flex flex-col items-center text-bordeaux font-bold text-lg">{kcalDia}<span className="text-xs uppercase tracking-wider text-castanho/70 font-semibold">kcal</span></p>

            <p className="flex flex-col items-center text-bordeaux font-bold text-lg">{carbohydratesDia}g <span className="text-xs uppercase tracking-wider text-castanho/70 font-semibold">Hidratos</span></p>

            <p className="flex flex-col items-center text-bordeaux font-bold text-lg">{proteinaDia}g <span className="text-xs uppercase tracking-wider text-castanho/70 font-semibold">Proteina</span></p>

            <p className="flex flex-col items-center text-bordeaux font-bold text-lg">{fatDia}g <span className="text-xs uppercase tracking-wider text-castanho/70 font-semibold">Gordura</span></p>
        </div>
    )
}