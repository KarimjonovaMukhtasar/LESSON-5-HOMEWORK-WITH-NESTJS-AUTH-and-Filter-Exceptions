import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Register } from '../auth/types/register.type';
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"
import { create } from 'node:domain';

@Injectable()
export class UsersService {
  private users: Register[] = []
  async create(createUserDto: CreateUserDto) {
    const existedUser = this.users.find(el=> el.email === createUserDto.email)
    if(existedUser){
      throw new ConflictException()
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    createUserDto.password = hashedPassword
    const newUser = {...createUserDto, id: uuid()}
    this.users.push(newUser)
    return {
      success: true,
      message: `SUCCESSFULLY CREATED A NEW USER!`,
      data: newUser
    };
  }

  findAll() {
    return {
      success: true,
      message: `SUCCESSFULLY RETRIEVED ALL USERS!`,
      data: this.users
    };
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} user`;
  // }
}
