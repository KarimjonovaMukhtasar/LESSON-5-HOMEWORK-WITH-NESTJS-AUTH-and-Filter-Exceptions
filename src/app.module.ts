import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleWare } from './custom-middleware/logger.middleware';
import { AuthController } from './modules/auth/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule , JwtModule.register({
          secret: "Resilient1804",
          signOptions: {expiresIn: "7d"},
          global: true
      })],
  controllers: [AppController],
  providers: [AppService, AuthGuard, RoleGuard],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(AuthController)
  }
}
