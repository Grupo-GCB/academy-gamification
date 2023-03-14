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

import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';
import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.id)
  @JoinColumn({ name: 'collaborator_id' })
  @Column()
  collaborator_id: string;

  @Column()
  user_id: string;

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
