import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { IAuthRepository } from '@modules/auth/domain/interfaces/auth-repository.interface';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { EmailService } from '@modules/email/application/email.service';
import { LoginRequestDto } from '@modules/auth/domain/dtos/request/login.request.dto';
import { AuthHelper } from '../helpers/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly emailService: EmailService,
    private readonly authHelper: AuthHelper,
    private readonly jwtService: JwtService,
  ) {}

  async singup(user: UserEntity): Promise<UserEntity> {
    const existRegisteredUser = await this.authRepository.verifyExistRegisteredUser(user.email);
    if (existRegisteredUser) {
      throw new BadRequestException('There is already a registered user with that email');
    }
    user.password = this.authHelper.generateUserTemporaryPassword();
    console.log('Senha temporária: ' + user.password);
    const plainPassword = user.password;
    user.password = await this.authHelper.hashPassword(user.password);

    const createdUser = await this.authRepository.create(user);
    //await this.emailService.sendUserTemporaryPasswordEmail(plainPassword, user.email, user.name);

    return createdUser;
  }

  async login(request: LoginRequestDto, res: Response): Promise<string> {
    const user = await this.validateUser(request.email, request.password);
    if (user.isActive === false) {
      await this.authRepository.activeUser(user.email);
    }

    const payload = { sub: user.id, name: user.name, email: user.email };
    const access_token = this.jwtService.sign(payload);
    const implementsCookies = this.authHelper.implementsCookies(access_token, res);
    if (!implementsCookies) {
      throw new BadRequestException('A system error has occurred. Please contact support.');
    }
    return access_token;
  }

  async logout(res: Response): Promise<void> {
    await this.authHelper.clearCookies(res);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const existRegisteredUser = await this.authRepository.verifyExistRegisteredUser(email);
    if (!existRegisteredUser) {
      throw new NotFoundException('There is no registered user with that email');
    }
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValidPassword = await this.authHelper.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }
}
