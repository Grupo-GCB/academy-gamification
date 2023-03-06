import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { randomUUID } from 'node:crypto';

import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.id)
  collaborator_id: string;

  @Column()
  business_unit: BusinessUnits;

  @Column()
  reason: string;

  @Column()
  type: TransactionReasons;

  @Column()
  academys: string[];

  @Column()
  status: CollaborationsStatus;

  @Column()
  gcbits: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
