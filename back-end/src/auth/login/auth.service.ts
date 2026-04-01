import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as brcyptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';


//Classe que junto com o passport local valida o se o usuario esta no banco de dados, e foi passado a informação correta
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


  async validateUser(email: string, pass: string) {
    const foundUser = await this.usersService.findByUserEmail(email);

    if (!foundUser || !brcyptCompareSync(pass, foundUser.password)) {
      return null
    }
    const { password, ...result } = foundUser;
    return result;

  }
  async  signIn(user: { id: string; email: string }) {

    const payload = {
      sub: user.id,
      email: user.email
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}

