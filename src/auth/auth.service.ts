import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as brcyptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jtwExpirationTimeInSeconds: number
  
  constructor( 
    
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jtwExpirationTimeInSeconds = Number(this.configService.get<number>('JWT_EXPIRATION_TIME'))
  }



  async singIn(email:string, password:string) {
    const foundUser = await this.usersService.findByUserEmail(email);

    if(!foundUser || !brcyptCompareSync(password, foundUser.password)){
      throw new UnauthorizedException(`Email ou senha invalidos`);
    }

    const payload = {sub: foundUser.id, email: foundUser.email}
    
    const token = this.jwtService.sign(payload)

    return { token, expiresIn: this.jtwExpirationTimeInSeconds }
  }


}
