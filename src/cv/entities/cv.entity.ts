import { CvHistory } from 'src/cvhistory/cvhistory.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from 'src/auth/auth.entity';

@Entity()
export class Cv extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;

  @ManyToMany(() => Skill, (skill) => skill.cvs, { eager: true })
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.cvs, { eager: true })
  user: User;
  

  @OneToOne(() => CvHistory, (cvHistory) => cvHistory.cv)
  @JoinColumn()
  histories: CvHistory;
  
}
