import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'node:crypto';

import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.id)
  collaborator_id: string;

  @Column()
  business_unit: BusinessUnits;

  @Column()
  reason: TransactionReasons;

  @Column()
  type: string;

  @Column('text', { array: true })
  academys: string[];

  @Column()
  status: CollaborationsStatus;

  @Column()
  gcbits: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
