import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
        user: User
        
    @CreateDateColumn()
        createdAt: Date
}
