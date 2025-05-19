
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the roles required for the route
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get the user from the request
    const { user } = context.switchToHttp().getRequest();
    
    // If no user, deny access
    if (!user) {
      return false;
    }
    
    // Get the user roles
    const userRoles = await this.authService.getUserRoles(user.id);
    
    // Check if the user has at least one of the required roles
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
