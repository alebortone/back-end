import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { ILike } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,


  ) { }

  async create(userDto: CreateUserDto) {
    const userAux = await this.findByUserEmail(userDto.email)

    if (userAux) {
      throw new ConflictException(`Usuario "${userDto.email}" ja existe`)
    }

    const newUser = this.userRepository.create(userDto);
    newUser.password = bcryptHashSync(userDto.password, 10)
    await this.userRepository.save(newUser);

    const { password, ...userCreated } = newUser;
    return userCreated;
  }

  async findByUserEmail(email: string) {
    const userFound = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'], 
    });

    if (!userFound) {
      return null;
    }
    return userFound;
  }

  async findByName(name:string){
    return await this.userRepository.find({
    where: {
      name: ILike(`%${name}%`)
    }
  });
  
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    } else {
      return user;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const up = await this.findOne(id);
    if (!up) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    } else {
      await this.userRepository.update(id, updateUserDto);
      return this.findOne(id);
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }

    await this.userRepository.softDelete(id);


  }

}
