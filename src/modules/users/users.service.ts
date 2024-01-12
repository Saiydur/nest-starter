import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { ErrorUtils } from 'src/utils/error.utils';
import { Constants } from 'src/utils/constant.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async create(entity: any) {
    const data = await this.repository.createEntity(entity);
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async fetchOne(query: any) {
    const data = await this.repository.readOneEntity(query);
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async findAll() {
    const data = await this.repository.readManyEntities({});
    this.logger.info(data);
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.repository.readOneEntity({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async update(id: string, dto: any) {
    const data = await this.repository.updateEntity(
      'id = :id',
      {
        id: id,
      },
      {
        fullName: dto.fullName,
        email: dto.email,
        userImage: dto.userImage,
        isActive: true,
      },
    );
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async remove(id: string) {
    const data = await this.repository.deleteEntity(
      'id = :id',
      {
        id: id,
      },
      {
        isDeleted: true,
        isActive: false,
      },
    );
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async findOneByOptions(query: any) {
    const data = await this.repository.readOneEntity(query);
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async activate(id: string, dto: any) {
    const data = await this.repository.updateEntity(
      'id = :id',
      {
        id: id,
      },
      {
        fullName: dto.fullName,
        isActive: true,
      },
    );
    if (data instanceof Error) {
      this.logger.error(data);
      ErrorUtils.throwHttpError();
    }
    if (!data) {
      ErrorUtils.throwHttpError(Constants.BAD_REQ, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
