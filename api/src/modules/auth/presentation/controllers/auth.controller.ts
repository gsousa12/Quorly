import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '@modules/auth/application/services/auth.service';
import { SingupRequestDto } from '@modules/auth/domain/dtos/request/singup.request.dto';
import { AuthMapper } from '@modules/auth/domain/mappers/auth.mapper';
import { createApiResponse } from '@common/utils/api-response';
import { LoginRequestDto } from '@modules/auth/domain/dtos/request/login.request.dto';
import { Response } from 'express';
import { Public } from '@common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/singup')
  @HttpCode(HttpStatus.OK)
  async singup(@Body() request: SingupRequestDto) {
    const user = await AuthMapper.toMapperSingupRequest(request);
    const createdUser = await this.authService.singup(user);
    const response = AuthMapper.toMapperSingupResponse(createdUser);
    return createApiResponse('Account created successfully', response);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    await this.authService.login(request, res);
    return createApiResponse('Logged in successfully', {});
  }

  @Public()
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);
    return createApiResponse('Logged out successfully', {});
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword() {}
}
