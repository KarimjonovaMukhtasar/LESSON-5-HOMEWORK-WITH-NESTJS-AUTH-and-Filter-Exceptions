import { Roles } from "src/modules/auth/types/roles.enum";
import { SetMetadata } from "@nestjs/common";

export const UserRoles = (...roles: Roles[]) => SetMetadata("roles", roles)