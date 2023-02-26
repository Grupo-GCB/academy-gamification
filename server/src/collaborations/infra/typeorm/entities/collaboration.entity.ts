import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { CollaborationsStatus } from '@shared/constants';

@Entity('collaboration')
export class Collaboration {
  @PrimaryColumn()
  id: string;

  @Column()
  collaboration_type_id: string;

  @Column()
  collaborator_id: string;

  @ManyToMany(() => Academy)
  @JoinTable({
    name: 'collaboration_academy',
    joinColumns: [{ name: 'collaboration_id' }],
    inverseJoinColumns: [{ name: 'academy_id' }],
  })
  academy_id: string[];

  @Column()
  status: CollaborationsStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  approved_at?: Date;

  @UpdateDateColumn()
  rejected_at?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
