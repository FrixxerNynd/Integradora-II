// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token no proporcionado');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        const payload = this.jwtService.verify(token);
        req.user = payload;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Token inválido o expirado');
      }
    }
  }
  