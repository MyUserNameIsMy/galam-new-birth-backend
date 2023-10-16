import { RootAbstractEntity } from './root-abstract.entity';
import { Column, Entity } from 'typeorm';
import { WeekDayEnum } from '../../common/enums/week-day.enum';

@Entity('week_days')
export class WeekDayEntity extends RootAbstractEntity {
  @Column({ type: 'enum', enum: WeekDayEnum, unique: true })
  week_day: WeekDayEnum;
}
