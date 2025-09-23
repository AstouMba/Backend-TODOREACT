import { z } from 'zod';
export declare const OMTaskSchema: z.ZodObject<{
    titre: z.ZodString;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type TagsInput = z.infer<typeof OMTaskSchema>;
//# sourceMappingURL=TaskModel.d.ts.map