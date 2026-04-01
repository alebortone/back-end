import { Inject, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/passport_jwt/jwt-auth.guard';



@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`Usuario nao encontrado`);
    }

    const newTask: CreateTaskDto = this.tasksRepository.create({ ...createTaskDto, user })
    await this.tasksRepository.save(newTask);

  }

  async findAll() {

    return await this.tasksRepository.find({ relations: ['user'] });;
  }

  async findByTitle(title: string) {
    return await this.tasksRepository.find({
      where: {
        title: ILike(`%${title}%`)
      }
    });

  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id })

    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} nao encontrada `);
    } else {
      await this.tasksRepository.update(id, updateTaskDto); //
      return this.findOne(id);
    }
  }
  async remove(id: number) {
    const task = await this.tasksRepository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    } else {
      await this.tasksRepository.softDelete(id);
    }
  }
}
