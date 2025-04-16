import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthService } from './application/services/auth.service';
import { EmailModule } from '@modules/email/email.module';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
    BcryptAdapter,
  ],
})
export class AuthModule {}
