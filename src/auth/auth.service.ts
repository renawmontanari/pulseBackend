import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import * as bcrypt from 'bcrypt';
import { LoginPulseDto } from './dto/login-pulse.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Collaborator)
    private collaboratorModel: typeof Collaborator,
    private jwtService: JwtService,
  ) {}

  async validateUserPulse(username: string, pass: string): Promise<any> {
    const userPulse = await this.collaboratorModel.findOne({
      where: { username },
    });

    if (!userPulse) {
      throw new Error('Usuário Pulse não encontrado!');
    }

    const isMatchUserPulse = await bcrypt.compare(pass, userPulse.password);

    if (!isMatchUserPulse) {
      throw new Error('Senha do usuário Pulse incorreta!');
    }

    const { password, ...result } = userPulse.toJSON();
    return result;
  }

  async loginPulse(loginPulseDto: LoginPulseDto) {
    const userPulse = await this.validateUserPulse(
      loginPulseDto.username,
      loginPulseDto.password,
    );
    const payload = {
      username: userPulse.username,
      sub: userPulse.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userPulse: {
        id: userPulse.id,
        name: userPulse.name,
        username: userPulse.username,
        avatar: userPulse.avatar,
      },
    };
  }
}
