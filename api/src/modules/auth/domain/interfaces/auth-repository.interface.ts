import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface IAuthRepository {
  create(user: UserEntity): Promise<UserEntity>;

  findUserByEmail(email: string): Promise<UserEntity | null>;
  verifyExistRegisteredUser(email: string): Promise<boolean>;
  activeUser(email: string): Promise<void>;
}
