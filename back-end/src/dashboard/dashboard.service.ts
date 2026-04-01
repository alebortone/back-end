import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getData(userId: string) {
    const totalUsers = await this.userRepository.count();

    const totalTasks = await this.taskRepository.count();

    const completedTasks = await this.taskRepository.count({
      where: { completed: true }
    });
    
    const pendentsTasks = await this.taskRepository.count({
      where: { completed: false }
    });

    const myTasksCont = await this.taskRepository.count({
      where: { user: { id: userId } }
    });
    
    const myTasks = await this.taskRepository.find({
      where: { user: { id: userId } },
    });
   

    const myCompletedTasks = await this.taskRepository.count({
      where: {
        user: { id: userId },
        completed: true
      }
    });
    
    const myPendentsTasks = await this.taskRepository.count({
      where: {
        user: { id: userId },
        completed: false
      }
    });

    return {
      totalUsers,
      totalTasks,
      completedTasks,
      pendentsTasks,
      myTasksCont,
      myTasks,
      myCompletedTasks,
      myPendentsTasks
    };
  }
}
