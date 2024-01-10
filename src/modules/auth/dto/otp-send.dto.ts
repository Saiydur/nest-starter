import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OtpSendDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly msisdn: string;
}
