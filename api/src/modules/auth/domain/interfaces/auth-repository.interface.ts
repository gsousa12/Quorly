import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface IAuthRepository {
  create(user: UserEntity): Promise<UserEntity>;
  verifyExistRegisteredUser(email: string): Promise<boolean>;
}
