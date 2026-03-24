import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique:true})
    email: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]

    @DeleteDateColumn() 
    deletedAt: Date;


}






