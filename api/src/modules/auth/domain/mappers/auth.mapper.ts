import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { SingupRequestDto } from '../dtos/request/singup.request.dto';
import { SingupResponseDto } from '../dtos/response/singup.response.dto';

export class AuthMapper {
  static async toMapperSingupRequest(request: SingupRequestDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = request.name;
    user.email = request.email;
    return user;
  }

  static toMapperSingupResponse(createdUser: UserEntity): SingupResponseDto {
    const response = new SingupResponseDto();
    (response.name = createdUser.name), (response.email = createdUser.email);
    return response;
  }
}
