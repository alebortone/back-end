import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        title: string
    
    @Column()
        description: string 
        
    @Column()
        completed: boolean
    
    @ManyToOne(() => User, user => user.tasks)
        userId: User
        
    @CreateDateColumn()
        createdAt: Date
}
