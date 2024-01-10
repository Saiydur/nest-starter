import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpClient {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, config: any) {
    return new Promise<any>((resolve, reject) => {
      this.httpService.get(url, config).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err: Error) => {
          reject(err);
        },
      });
    });
  }

  async post(url: string, data: any, config: any) {
    return new Promise<any>((resolve, reject) => {
      this.httpService.post(url, data, config).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err: Error) => {
          reject(err);
        },
      });
    });
  }
}
