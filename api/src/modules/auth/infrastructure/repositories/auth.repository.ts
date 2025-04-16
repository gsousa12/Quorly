import { IAuthRepository } from '@modules/auth/domain/interfaces/auth-repository.interface';
import { PrismaService } from '@modules/prisma/application/services/prisma.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verifyExistRegisteredUser(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return !!user;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        isActive: false,
        createdAt: new Date(),
      },
    });

    return createdUser;
  }
}
