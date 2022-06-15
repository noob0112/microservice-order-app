import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { IUserResponse } from './models/users.entity';
import { objectId } from 'src/common/type/objectId.type';
import { objectIdDto, userUpdateDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersReponsetory: UserRepository) {}

  public async getAllUsers(): Promise<[IUserResponse]> {
    return await this.usersReponsetory
      .find({}, 'fullName email address')
      .limit(5);
  }

  public async getUserById(id: objectId): Promise<IUserResponse> {
    const user = await this.usersReponsetory.findById(
      id,
      'fullName email address',
    );

    if (!user) {
      throw new HttpException('userId does not exist', 400);
    }

    return user;
  }

  public async updateUserById(
    id: objectId,
    update: userUpdateDto,
  ): Promise<IUserResponse> {
    const userUpdate = await this.usersReponsetory.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
        select: 'fullName email address',
      },
    );

    if (!userUpdate) {
      throw new HttpException('userId does not exist', 400);
    }

    return userUpdate;
  }

  public async deleteUserById(id: objectId): Promise<string> {
    const userDelete = await this.usersReponsetory.findByIdAndDelete(id);

    if (!userDelete) {
      throw new HttpException('userId does not exist', 400);
    }

    return `Delete ${id} successfully!`;
  }
}
