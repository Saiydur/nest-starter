import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRole } from 'src/core/enums/user.role';
import { Constants, ResponseMessages } from 'src/utils/constant.utils';
import { ErrorUtils } from 'src/utils/error.utils';
import { OtpVerifyDto } from '../dto/otp-verify.dto';
import { OtpSendDto } from '../dto/otp-send.dto';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OtpsRepository } from '../otps.repository';

@Injectable()
export class OtpsService {
  constructor(
    private readonly repository: OtpsRepository,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async generateSendOtp(msisdn: string) {
    const pass = '1234';
    const message = `${Constants.OTP_MESSAGE} ${pass}`;

    const url = `http://bulksmsbd.net/api/smsapi?api_key=JhJrjJSGgITLXpdEmOYh&type=text&number=${msisdn}&senderid=8809617611031&message=${message}`;
    const config = {
      method: 'get',
      url: url,
    };
    const response = fetch(url, config)
      .then((res) => res.json())
      .catch((e) => {
        this.logger.error(e);
      });

    if (!response) {
      ErrorUtils.throwHttpError(
        ResponseMessages.UNABLE_CREATE_OTP,
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.repository.createEntity({
      msisdn: msisdn,
      otp: pass,
    });
    if (!data) {
      ErrorUtils.throwHttpError(
        ResponseMessages.UNABLE_CREATE_OTP,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (data instanceof Error) {
      ErrorUtils.throwHttpError();
    }
    return data;
  }

  async test() {
    this.logger.info('test');
    return 'test';
  }

  async create(dto: OtpSendDto) {
    const { msisdn } = dto;
    const data = await this.generateSendOtp(msisdn);
    if (!data) {
      ErrorUtils.throwHttpError(
        ResponseMessages.UNABLE_CREATE_OTP,
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: ResponseMessages.CREATED_OTP,
    };
  }

  async resend(dto: OtpSendDto) {
    const { msisdn } = dto;
    // delete previous otps
    let data: any = await this.repository.updateEntity(
      'msisdn = :msisdn',
      {
        msisdn: msisdn,
      },
      {
        isDeleted: true,
      },
    );
    data = await this.generateSendOtp(msisdn);
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return {
      message: ResponseMessages.RESEND_OTP,
    };
  }

  async verify(dto: OtpVerifyDto) {
    const { msisdn, otp } = dto;
    let data = await this.repository.readOneEntity({
      where: {
        msisdn: msisdn,
        otp: otp,
        isDeleted: false,
      },
    });
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(
        ResponseMessages.INVALID_OTP,
        HttpStatus.BAD_REQUEST,
      );
    }

    const expiryTime = data.expiryTime.getTime();
    const currentTime = new Date().getTime();
    const lifespan = 180 * 1000; // convert to milliseconds
    const expiryTimestamp = expiryTime + lifespan;

    if (currentTime > expiryTimestamp) {
      ErrorUtils.throwHttpError(
        ResponseMessages.EXPIRED_OTP,
        HttpStatus.BAD_REQUEST,
      );
    }

    data = await this.repository.updateEntity(
      'id = :id',
      {
        id: data.id,
      },
      {
        isDeleted: true,
      },
    );
    data = await this.usersService.fetchOne({
      where: {
        msisdn: msisdn,
        isDeleted: false,
      },
    });
    if (!data || data instanceof Error) {
      data = await this.usersService.create({
        fullName: null,
        msisdn: msisdn,
        email: null,
        role: UserRole.User,
      });
    }
    return this.authService.authenticateUser(data);
  }
}
