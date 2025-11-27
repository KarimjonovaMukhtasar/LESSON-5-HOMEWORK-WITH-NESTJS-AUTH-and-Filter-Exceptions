import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Register } from './types/register.type';
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { JwtService } from '@nestjs/jwt';
import "dotenv/config"
import { LoginDto } from './dto/login.dto';
import { CustomBadRequest } from 'src/custom-exceptions/custom.badRequest';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService){}
    public users: Register[] = []
    async register(payload: RegisterDto){
        const existedUser = this.users.find(el => el.email === payload.email)
        if(existedUser){
            throw new CustomBadRequest(`THIS USER ALREADY EXISTS IN THE DATABASE!`)
            // throw new ConflictException(`THIS USER ALREADY EXISTS IN THE DATABASE!`)
        }
        const hashedPassword = await bcrypt.hash(payload.password, 10)
        payload.password = hashedPassword
        const id = uuid()
        const newUser = {...payload, id}
        this.users.push(newUser)
        const accessToken = await this.jwtService.signAsync({ id: newUser.id }, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '7d'})

        const refreshToken = await this.jwtService.signAsync({id: newUser.id}, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d'})
        return {
            success: true,
            message: `SUCCESSFULLY REGISTERED A NEW USER!`,
            data: newUser,
            tokens: {accessToken, refreshToken}
        }
        }

    async login(payload: LoginDto){
        const user = this.users.find(el => el.email === payload.email)
        if(!user){
            throw new NotFoundException(`THIS EMAIL DOESN'T EXIST YET, MAYBE YOU NEED TO REGISTER FIRST!`)
        }
        const checkPassword = await bcrypt.compare(payload.password, user.password)
        if(!checkPassword){
            throw new NotFoundException(`EMAIL OR PASSWORD IS WRONG!`)
        }
        const accessToken = await this.jwtService.signAsync({ id: user.id }, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '7d'})

        const refreshToken = await this.jwtService.signAsync({id: user.id}, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d'})
        return {
            success: true,
            message: `SUCCESSFULLY LOGGED IN, WELCOME TO YOUR PROFILE`,
            tokens: {accessToken ,refreshToken}}
        }
    }