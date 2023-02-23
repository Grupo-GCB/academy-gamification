import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('academys')
export class Academy {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
