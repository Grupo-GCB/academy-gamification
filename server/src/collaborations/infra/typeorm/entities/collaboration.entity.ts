import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  approved_at?: Date = null;

  @UpdateDateColumn()
  rejected_at?: Date = null;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
