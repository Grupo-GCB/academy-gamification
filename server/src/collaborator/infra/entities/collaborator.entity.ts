import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('collaborators')
export class Collaborator {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
