import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';

@Entity('wallets')
export class Wallet {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.id)
  @JoinColumn({ name: 'collaborator_id' })
  @Column()
  collaborator_id: string;

  @Column()
  gcbits: number;

  @UpdateDateColumn()
  updated_at: Date;
}
