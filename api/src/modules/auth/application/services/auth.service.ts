import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { IAuthRepository } from '@modules/auth/domain/interfaces/auth-repository.interface';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { generateUserTemporaryPassword, hashPassword } from '../helpers/password.helper';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { EmailService } from '@modules/email/application/email.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly emailService: EmailService,
    // private readonly jwtService: JwtService,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const existRegisteredUser = await this.authRepository.verifyExistRegisteredUser(user.email);
    if (existRegisteredUser) {
      throw new BadRequestException('There is already a registered user with that email');
    }
    user.password = generateUserTemporaryPassword();
    console.log('Senha temporária: ' + user.password);
    const plainPassword = user.password;
    user.password = await this.bcryptAdapter.hash(user.password);

    const createdUser = await this.authRepository.create(user);
    //await this.emailService.sendUserTemporaryPasswordEmail(plainPassword, user.email, user.name);

    return createdUser;
  }
}
