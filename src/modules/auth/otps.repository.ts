import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DataSource, Repository } from 'typeorm';
import { Logger } from 'winston';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpsRepository extends Repository<Otp> {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super(Otp, dataSource.createEntityManager());
  }

  async createEntity(params: any): Promise<any> {
    try {
      const entity = this.create(params);
      await this.save(entity);
      return entity;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async readOneEntity(options: any): Promise<any> {
    try {
      return this.findOne(options);
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async updateEntity(
    whereClause: string,
    whereParams: any,
    setParams: any,
  ): Promise<any> {
    try {
      const updateResult = await this.dataSource
        .createQueryBuilder()
        .update(Otp)
        .set(setParams)
        .where(whereClause, whereParams)
        .execute();
      if (updateResult) {
        return updateResult.affected;
      }
      return null;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}
