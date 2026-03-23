import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.usersRepository.findOneBy({ id: createTaskDto.userId });

    if (!user) {
      throw new Error(`Usuario nao enconstrado `);
    }

    const newTask = this.tasksRepository.create({ ...createTaskDto, user })
    return await this.tasksRepository.save(newTask);
  }

  async findAll() {

    return await this.tasksRepository.find({ relations: ['user'] });;
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id })

    if (!task) {
      throw new Error(`Tarefa com ID ${id} nao encontrada `);
    }else {
      await this.tasksRepository.update(id, updateTaskDto);
      return this.findOne(id);
    }
  }
  async remove(id: number) {
    const task = await this.tasksRepository.findOneBy({ id })
    if (!task){
      throw new Error('Tarefa não encontrada')
    }else{
      await this.tasksRepository.delete(id);
    }
  }
}
