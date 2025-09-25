import { z } from 'zod';
export declare const AMTaskSchema: z.ZodObject<{
    titre: z.ZodString;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    audio: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type TagsInput = z.infer<typeof AMTaskSchema>;
//# sourceMappingURL=TaskModel.d.ts.map