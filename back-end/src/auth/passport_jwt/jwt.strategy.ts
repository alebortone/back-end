import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
// Ja essa classe é responsavel por validar o token, e ela que protege as rotas que um usuario nao logado nao deve acessar
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  //funcao que recebe o payload do token e retorna um objeto com as informações do usuario.
  async validate(payload: { sub: string; email: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}