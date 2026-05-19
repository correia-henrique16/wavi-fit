import {z} from 'zod';

export const RefeicaoSchema = z.object({
    name: z.string()
        .min(2, 'O nome deve ter no minimo 2 letras')
        .max(20, 'O nome não pode ter mais que 20 carateres'),
    
    ingredientes: z.array

    
})

//para autocomplete do vscode e detetar erros
export type TypeRefeicao = z.infer<typeof RefeicaoSchema>;