import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthService } from './application/services/auth.service';
import { EmailModule } from '@modules/email/email.module';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { AuthHelper } from './application/helpers/auth.helper';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PrismaModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
    BcryptAdapter,
    AuthHelper,
  ],
})
export class AuthModule {}
