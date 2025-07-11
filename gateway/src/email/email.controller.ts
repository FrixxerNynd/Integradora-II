import { Controller, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('email')
export class EmailController {
    constructor(private readonly httpService: HttpService) {}

    @Post('forgotpass')
    async forgotPassword(@Body() body: any) {
        const res$ = this.httpService.post('http://localhost:3002/api/email/forgotpass', body);
        const res = await lastValueFrom(res$);
        return res.data;
    }

}
