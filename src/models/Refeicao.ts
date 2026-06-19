import {z} from 'zod';

export const RefeicaoSchema = z.object({
    name: z.string()
        .min(2, 'O nome deve ter no minimo 2 letras')
        .max(20, 'O nome não pode ter mais que 20 carateres'),
    
    alimentos: z.array(
        z.object({
            alimento_id: z.coerce.number(),
            quantidade: z.coerce.number()
                .min(1, 'A quantidade deve ser pelo menos 1g')
                .max(1000000, 'A quantidade pode ter no máximo 1M g')
        })
    ).min(1, 'A refeição deve ter pelo menos 1 ingrediente'),

    tipo_refeicao: z.int()
        .min(1, 'Tem que escolher um dos tipos de refeição')
        .max(4, 'Tem que escolher um dos tipos de refeição'),

    data_refeicao: z.string().date({message: 'Formato da Data incorreto.'})
})

//para autocomplete do vscode e detetar erros
export type TypeRefeicao = z.infer<typeof RefeicaoSchema>;