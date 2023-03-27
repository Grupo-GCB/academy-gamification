import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('revoked_tokens')
export class RevokedToken {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
