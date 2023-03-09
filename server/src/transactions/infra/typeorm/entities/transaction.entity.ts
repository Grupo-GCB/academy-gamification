import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'collaborator_id' })
  @Column()
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
