import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OtpVerifyDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly msisdn: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly otp: string;
}
