import { Controller, Get, Delete, Query, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('data')
export class DataController {
    constructor(private readonly httpService: HttpService) {}

    @Get('all')
    async getAllData() {
        const res$ = this.httpService.get('http://data_service.railway.internal:3001/api/data/all');
        const res = await lastValueFrom(res$);
        return res.data;
    }

    /**
     * Ejemplo de Petición: GET /data/search?key=value&anotherKey=anotherValue
     */
    @Get('search')
    async getSearchData(@Query() queryParams: any) {
        const res$ = this.httpService.get('http://data_service.railway.internal:3001/api/data/search', {
            params: queryParams,
        });
        const res = await lastValueFrom(res$);
        return res.data;
    }

    /**
     * Ejemplo de Petición: DELETE /data/delete/some-unique-id
     */
    @Delete('delete/:id')
    async deleteData(@Param('id') id: string) {
        const res$ = this.httpService.delete(`http://data_service.railway.internal:3001/api/data/delete/${id}`);
        const res = await lastValueFrom(res$);
        return res.data;
    }
}