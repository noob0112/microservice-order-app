import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from '../../common/repository/mongo.repository';
import { UserDocument } from '../users/models/users.schema';
import { SignupDto } from './dto/auth.dto';
import { IUser } from './models/auth.entity';

@Injectable()
export class AuthRepository extends Repository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  public override create(newUser: SignupDto): Promise<IUser | undefined> {
    const user = new this.userModel(newUser);
    return user.save();
  }
}
