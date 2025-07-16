// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
      console.log('Token Recibido',authHeader)
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token no proporcionado');
      }
  
      const token = authHeader.split(' ')[1];
      console.log('Token',token)
  
      try {
        const payload = this.jwtService.verify(token);
        req.user = payload;
        console.log('Payload',payload)
        return true;
      } catch (err) {
        console.log('Error',err)
        throw new UnauthorizedException('Token inválido o expirado');
      }
    }
  }
  