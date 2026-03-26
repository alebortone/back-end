import { Module } from '@nestjs/common';
import { AuthService } from './login/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport_jwt/jwt.strategy';
import { LocalStrategy } from './passport_jwt/local.strategy';
import { AuthController } from './login/auth.controller';


@Module({
  imports:[JwtModule.registerAsync({
    global: true,
    imports:[],
    useFactory: async (configService: ConfigService) =>({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: Number(configService.get<string>('JWT_EXPIRATION_TIME'))},
    }),
    inject: [ConfigService],
    
  }),
  UsersModule,
  PassportModule,
],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
 
})


export class AuthModule {}