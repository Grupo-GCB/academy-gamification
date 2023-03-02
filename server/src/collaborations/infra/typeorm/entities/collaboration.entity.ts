import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CollaborationsStatus } from '@shared/constants';

@Entity('collaboration')
export class Collaboration {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  url: string;

  @Column()
  collaborator_id: string;

  @Column()
  status: CollaborationsStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ default: null })
  approved_at?: Date;

  @UpdateDateColumn({ default: null })
  rejected_at?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
