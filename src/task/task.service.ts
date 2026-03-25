import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException(`Usuario nao encontrado`);
    }

    const newTask:CreateTaskDto = this.tasksRepository.create({ ...createTaskDto, user })
    await this.tasksRepository.save(newTask);
    return `Tarefa criada com sucesso! Titulo: ${createTaskDto.title}`;
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
      throw new NotFoundException(`Tarefa com ID ${id} nao encontrada `);
    }else {
      await this.tasksRepository.update(id, updateTaskDto);
      return this.findOne(id);
    }
  }
  async remove(id: number) {
    const task = await this.tasksRepository.findOneBy({ id })
    if (!task){
      throw new NotFoundException('Tarefa não encontrada')
    }else{
      await this.tasksRepository.softDelete(id);
    }
  }
}
