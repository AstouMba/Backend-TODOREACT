import type { TagsInput } from "./PermissionModel.js";

export interface HistoriqueTache {
  id: number;
  action: string;
  user: TagsInput;
  createdAt: string;
  modifiedAt?: string;
}
