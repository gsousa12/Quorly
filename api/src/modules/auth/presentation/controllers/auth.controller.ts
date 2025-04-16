import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/application/services/auth.service';
import { SingupRequestDto } from '@modules/auth/domain/dtos/request/singup.request.dto';
import { AuthMapper } from '@modules/auth/domain/mappers/auth.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/singup')
  @HttpCode(HttpStatus.OK)
  async singup(@Body() request: SingupRequestDto) {
    const user = await AuthMapper.toMapperSingupRequest(request);
    const createdUser = await this.authService.create(user);
    const response = AuthMapper.toMapperSingupResponse(createdUser);
    return response;
  }
}
