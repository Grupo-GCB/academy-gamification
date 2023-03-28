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
  CollaborationsSubType,
  RedeemSubType,
  Status,
  Types,
} from '@shared/constants';
import { User } from '@users/infra/entities';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.email)
  @JoinColumn({
    name: 'user',
    referencedColumnName: 'email',
  })
  @Column()
  user: string;

  @Column()
  responsible: string;

  @Column()
  type: Types;

  @Column()
  sub_type?: CollaborationsSubType | RedeemSubType;

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
