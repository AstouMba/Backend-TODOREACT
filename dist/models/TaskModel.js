import { z } from 'zod';
export const AMTaskSchema = z.object({
    titre: z.string().min(1, "Le titre est obligatoire"),
    description: z.string().min(1),
    image: z.string().optional(),
    audio: z.string().optional(),
});
//# sourceMappingURL=TaskModel.js.map