import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Academys,
  Admin,
  BusinessUnits,
  CollaborationsTypes,
  Reasons,
  ReedemTypes,
  Status,
} from '@shared/constants';
import { User } from '@users/infra/entities/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.email)
  @JoinColumn({ name: 'email' })
  @Column()
  collaborator: string;

  @Column()
  responsible: Academys | Admin;

  @Column()
  business_unit: BusinessUnits;

  @Column()
  reason: Reasons;

  @Column()
  type?: CollaborationsTypes | ReedemTypes;

  // @Column('enum', { array: true })
  // academys: Academys[];

  @Column()
  status: Status;

  @Column()
  gcbits: number;

  @Column()
  description?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
