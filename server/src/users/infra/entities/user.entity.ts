import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BusinessUnits, Roles } from '@shared/constants';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  business_unit: BusinessUnits;

  @Column()
  role: Roles;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn({ default: null })
  updated_at?: Date;

  @DeleteDateColumn({ default: null })
  deleted_at?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
