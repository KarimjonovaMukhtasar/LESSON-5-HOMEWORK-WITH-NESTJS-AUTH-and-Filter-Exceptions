import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt"

@Module({
    imports: [JwtModule.register({
        secret: "Resilient1804",
        signOptions: {expiresIn: "7d"},
        global: true
    })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
