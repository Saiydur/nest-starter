import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DataSource, Repository } from 'typeorm';
import { Logger } from 'winston';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createEntity(params: User): Promise<User | Error> {
    try {
      const entity = this.create(params);
      await this.save(entity);
      return entity;
    } catch (e) {
      return e;
    }
  }

  async readManyEntities(options: any): Promise<User[] | Error> {
    try {
      return this.find(options);
    } catch (e) {
      return e;
    }
  }

  async readOneEntity(options: any): Promise<User | Error> {
    try {
      return this.findOne(options);
    } catch (e) {
      return e;
    }
  }

  async updateEntity(
    whereClause: string,
    whereParams: any,
    setParams: any,
  ): Promise<any> {
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .update(User)
        .set(setParams)
        .where(whereClause, whereParams)
        .execute();
      return result;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async deleteEntity(
    whereClause: string,
    whereParams: any,
    setParams: any,
  ): Promise<any> {
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .update(User)
        .set(setParams)
        .where(whereClause, whereParams)
        .execute();
      return result;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}
