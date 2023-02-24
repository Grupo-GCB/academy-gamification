import { randomUUID } from 'crypto';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('academys')
export class Academy {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
