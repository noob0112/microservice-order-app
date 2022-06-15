import { HttpException, Injectable } from '@nestjs/common';
import { IUserLogin, IUserSignUp } from './models/auth.entity';
import { AuthRepository } from './auth.repository';
import { AES, enc } from 'crypto-js';
import { SignupDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { cryptoJsConstants } from './auth.constant';
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  //SIGNUP
  public async signUp(newUser: SignupDto): Promise<IUserSignUp> {
    newUser.password = AES.encrypt(
      newUser.password,
      cryptoJsConstants.secret,
    ).toString();

    return await this.authRepository
      .create(newUser)
      .then((user) => {
        return {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          address: user.address,
        };
      })
      .catch((error) => {
        if (error.keyPattern.email) {
          throw new HttpException('email is existed!', 400);
        }
        throw new HttpException(error, 400);
      });
  }

  //LOGIN
  public async login(email: string, pass: string): Promise<IUserLogin> {
    const userFind = await this.validateUser(email, pass);
    const payload = {
      userId: userFind._id,
      email: userFind.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        _id: userFind._id,
        fullName: userFind.fullName,
        email: userFind.email,
        address: userFind.address,
      },
    };
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const userFind = await this.authRepository
      .findOne({ email: email })
      .then()
      .catch((error) => {
        throw new HttpException(error, 400);
      });

    if (!userFind) {
      throw new HttpException('email or password is not correct!', 400);
    }

    const hashedPassord = AES.decrypt(
      userFind.password,
      cryptoJsConstants.secret,
    );

    const originalPassword = hashedPassord.toString(enc.Utf8);

    if (originalPassword !== pass) {
      throw new HttpException('email or password is not correct!', 400);
    }

    return userFind;
  }
}
