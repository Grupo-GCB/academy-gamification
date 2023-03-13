import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('rewards')
export class Reward {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
