// src/user/user.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  // 🔓 Login
  @Post('login')
  async login(@Body() body: any) {
    const res$ = this.httpService.post('http://localhost:3003/api/users/login', body);
    const res = await lastValueFrom(res$);
    return res.data;
  }

  // 🔒 Crear usuario
  @Post('create')
  async createUser(@Body() body: any) {
    const res$ = this.httpService.post('http://localhost:3003/api/users/createU', body);
    const res = await lastValueFrom(res$);
    return res.data;
  }

  // 🔒 Obtener todos los usuarios
  @Get('all')
  async getUsers() {
    const res$ = this.httpService.get('http://localhost:3003/api/users/all');

    const res = await lastValueFrom(res$);
    return res.data;
  }


  // 🔒 Obtener usuario por email (usa body, no query)
  @Get('get/:email')
async getUserByEmail(@Param('email') email: string) {
  const res$ = this.httpService.get(`http://localhost:3003/api/users/get/${email}`);
  const res = await lastValueFrom(res$);
  return res.data;
}


  // 🔒 Actualizar usuario por email (solo actualiza `name`)
  @Put('update/:email')
  async updateUser(
    @Param('email') email: string,
    @Body() body: any,
  ) {
    const res$ = this.httpService.put(`http://localhost:3003/api/users/update/${email}`, body);
    const res = await lastValueFrom(res$);
    return res.data;
  }

  // 🔒 Dar de baja usuario (soft delete)
  @Delete('delete/:email')
  async deleteUser(@Param('email') email: string) {
    const res$ = this.httpService.delete(`http://localhost:3003/api/users/delete/${email}`);
    const res = await lastValueFrom(res$);
    return res.data;
  }
}
