import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { clearConfigCache } from 'prettier';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      // No roles are required to access this endpoint
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      // User is not authenticated
      return false;
    }
    return requiredRoles.some((r) => user.roles.includes(r));
  }
}
