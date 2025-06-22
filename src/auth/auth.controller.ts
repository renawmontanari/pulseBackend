import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginPulseDto } from './dto/login-pulse.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginPulseDto })
  @ApiResponse({
    status: 200,
    description: 'Login Pulse realizado com sucesso!',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais Pulse inválidas',
  })
  async login(@Body() loginPulseDto: LoginPulseDto) {
    return this.authService.loginPulse(loginPulseDto);
  }
}
