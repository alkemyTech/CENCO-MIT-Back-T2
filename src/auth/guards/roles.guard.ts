import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../users/entities';
import { ROLES_KEY } from '../decorators';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService, // Inject AuthService to validate the token
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    let user;
    try {
      user = this.authService.validateToken(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    const hasRole = requiredRoles.some((role) => user.role.includes(role));
    if (!hasRole) {
      throw new UnauthorizedException('You do not have the required role');
    }

    return true;
  }
}
