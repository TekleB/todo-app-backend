import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("todo")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  title;

  @Column({ type: "varchar", nullable: true })
  description;

  @Column({ type: "date", nullable: false })
  dueDate;

  @Column({ type: "boolean", nullable: false, default: true })
  status;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column()
  userId: string;
}
