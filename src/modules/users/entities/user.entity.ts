import { BaseEntity } from 'src/core/base/base.entity';
import { UserRole } from 'src/core/enums/user.role';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  msisdn: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'user_image', nullable: true })
  userImage: string;

  @Column({ nullable: false })
  role: UserRole;

  @Column({ default: false })
  hasSubscription?: boolean;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash?: string;

  @Column({ default: false })
  isActive?: boolean;
}
