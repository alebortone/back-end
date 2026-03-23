import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(userDto: CreateUserDto) {
    const newUser = this.userRepository.create(userDto)
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    } else {
      return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const up = await this.findOne(id);
    if (!up) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    } else {
      await this.userRepository.update(id, updateUserDto);
      return this.findOne(id);
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }

    await this.userRepository.delete(id);
  }

}
