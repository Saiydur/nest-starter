import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { Constants } from 'src/utils/constant.utils';
import { OtpSendDto } from '../dto/otp-send.dto';
import { OtpVerifyDto } from '../dto/otp-verify.dto';
import { OtpsService } from '../services/otps.service';

@Controller({
  path: `auth/otps`,
  version: Constants.API_VERSION_1,
})
export class OtpsController {
  constructor(private readonly otpsService: OtpsService) {}

  @Get()
  testOtp() {
    return this.otpsService.test();
  }

  @Post('send')
  async sendOtp(@Body() dto: OtpSendDto) {
    return await this.otpsService.create(dto);
  }

  @Post('resend')
  async resendOtp(@Body() dto: OtpSendDto) {
    return await this.otpsService.resend(dto);
  }

  @Post('verify')
  async verifyOtp(@Body() dto: OtpVerifyDto) {
    return await this.otpsService.verify(dto);
  }
}
