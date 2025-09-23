import { z } from "zod";
export declare const PermissionSchema: z.ZodObject<{
    userId: z.ZodNumber;
    permission: z.ZodString;
}, z.core.$strip>;
export type TagsInput = z.infer<typeof PermissionSchema>;
//# sourceMappingURL=PermissionModel.d.ts.map