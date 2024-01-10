import { BaseEntity } from 'src/core/base/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  @Index()
  msisdn: string;
  @Column({ nullable: false })
  otp: string;
  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP(6)' })
  expiryTime: Date;
}
