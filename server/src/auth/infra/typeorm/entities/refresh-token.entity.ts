import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from '@users/infra/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  token: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user',
    referencedColumnName: 'id',
  })
  @Column()
  user: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiresAt?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
