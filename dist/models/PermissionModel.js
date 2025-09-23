import { z } from 'zod';
export const PermissionSchema = z.object({
    userId: z.number(),
    permission: z.string()
});
//# sourceMappingURL=PermissionModel.js.map