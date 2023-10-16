import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { OrganizationEntity } from '../../organization/entities/organization.entity';

@Entity('users')
export class UserEntity extends RootAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 12 })
  phone: string;

  @Column({ type: 'varchar', length: 9 })
  telegram_id: string;

  @OneToOne(() => OrganizationEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  organization: OrganizationEntity;
}
