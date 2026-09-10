import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

const SUPPLIERS: Record<string, string> = {
  "8753": "Claro",
  "9773": "Movistar",
  "3398": "Tigo",
  "4689": "WOM",
};

@Injectable()
export class PuntoredService {
  private token: string | null = null;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private getErrorMessage(error: any): string {
    if (error?.response?.data) {
      return JSON.stringify(error.response.data);
    }
    if (error?.message) {
      return error.message;
    }
    return String(error);
  }

  async auth(): Promise<string> {
    const baseUrl = this.config.get<string>('PUNTORED_BASE_URL');
    const user = this.config.get<string>('PUNTORED_USER');
    const password = this.config.get<string>('PUNTORED_PASSWORD');
    const apiKey = this.config.get<string>('PUNTORED_API_KEY');

    try {
      const response = await firstValueFrom(
        this.http.post(`${baseUrl}/auth`, { user, password }, {
          headers: { 'x-api-key': apiKey },
        })
      );

      this.token = response.data?.token?.replace(/^Bearer\s+/i, '');
      console.log('Token limpio:', this.token);

      if (!this.token) throw new UnauthorizedException('No se pudo obtener el token de Puntored');
      return this.token;
    } catch (error: any) {
      console.error('Error en auth:', this.getErrorMessage(error));
      throw new UnauthorizedException('Credenciales inválidas o API Key incorrecta');
    }
  }

  async getSuppliers() {
    await this.auth();
    const baseUrl = this.config.get<string>('PUNTORED_BASE_URL');
    try {
      const response = await firstValueFrom(
        this.http.get(`${baseUrl}/getSuppliers`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
      );

      return response.data ?? [];
    } catch (error: any) {
      console.error('Error en getSuppliers:', this.getErrorMessage(error));
      throw new BadRequestException('No se pudo obtener proveedores');
    }
  }

  async buy(cellPhone: string, value: number, supplierId: string) {
    await this.auth();
    const baseUrl = this.config.get<string>('PUNTORED_BASE_URL');

    const payload = { cellPhone, value: Number(value), supplierId };

    console.log('Enviando compra:', {
      url: `${baseUrl}/buy`,
      body: payload,
      headers: { Authorization: `Bearer ${this.token}` },
    });

    try {
      const response = await firstValueFrom(
        this.http.post(`${baseUrl}/buy`, payload, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
      );

      return {
        transactionId: response.data?.transactionId ?? null,
        status: response.data?.status ?? 'success',
        supplierName: SUPPLIERS[supplierId] ?? 'Desconocido',
        cellPhone,
        value,
        supplierId,
      };
    } catch (error: any) {
      console.error('Error en buy:', this.getErrorMessage(error));
      throw new BadRequestException('La recarga fue rechazada por Puntored');
    }
  }
}
