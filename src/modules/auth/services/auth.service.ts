import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import JwtClient from 'src/core/jwt/jwt.client';
import { HttpClient } from 'src/core/client/http.client';
import { ServerConfig } from 'src/configs/envs/default';
import CryptoUtils from 'src/utils/crypto.utils';
import { ErrorUtils } from 'src/utils/error.utils';
import { Constants, ResponseMessages } from 'src/utils/constant.utils';
import { LoginDto } from '../dto/login.dto';
import { AppUtils } from 'src/utils/app.utils';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtHelper: JwtClient,
    private readonly httpClient: HttpClient,
  ) {}

  async authenticateUser(entity: any): Promise<any> {
    const expiryTime: string = ServerConfig.jwt.expiresIn;
    const token = this.jwtHelper.generateToken(
      {
        userId: entity.id,
        role: entity.role,
      },
      expiryTime,
    );
    return {
      token: token,
      user: entity,
    };
  }

  private async matchPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      return await CryptoUtils.compare(password, passwordHash);
    } catch (e) {
      return false;
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    // check if exists
    let data: any = await this.usersService.findOneByOptions({
      email: email,
    });
    if (!data) {
      ErrorUtils.throwHttpError(Constants.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (data instanceof Error) {
      ErrorUtils.throwHttpError();
    }
    const matched = await this.matchPassword(password, data.passwordHash);
    if (matched) {
      data = this.authenticateUser(data);
      data.user = AppUtils.filterUserData(data.user);
      return data;
    }
    ErrorUtils.throwHttpError(Constants.UNAUTH_REQ, HttpStatus.UNAUTHORIZED);
  }

  async register(dto: RegisterUserDto) {
    const data = await this.usersService.activate('1', dto);
    if (!data) {
      ErrorUtils.throwHttpError(Constants.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (!data || data instanceof Error) {
      ErrorUtils.throwHttpError();
    }
    if (data.affected > 0) {
      return {
        message: ResponseMessages.REGISTER_SUCCESS,
      };
    }
    ErrorUtils.throwHttpError(
      ResponseMessages.REGISTER_FAILED,
      HttpStatus.BAD_REQUEST,
    );
  }
}
