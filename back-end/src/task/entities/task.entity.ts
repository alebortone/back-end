import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    completed: boolean

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({
        name: "user_id"
    })
    user: User

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn({select: false, name: "deleted_at"}) 
    deletedAt: Date;
}
