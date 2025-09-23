import { z } from 'zod';

export const OMTaskSchema = z.object({
    titre: z.string().min(1, "Le titre est obligatoire"),   
    description: z.string().min(1),
    image: z.string().optional(),
});

export type TagsInput = z.infer<typeof OMTaskSchema>;