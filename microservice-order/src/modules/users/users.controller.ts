import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';

import { UsersService } from './users.service';
import { objectIdDto, userUpdateDto } from './dto/users.dto';
import { Role } from './users.constant';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get(':id')
  getUserById(@Param() param: objectIdDto) {
    return this.usersService.getUserById(param.id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  updateUserById(
    @Param() param: objectIdDto,
    @Body() userUpdate: userUpdateDto,
  ) {
    return this.usersService.updateUserById(param.id, userUpdate);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteUserById(@Param() param: objectIdDto) {
    return this.usersService.deleteUserById(param.id);
  }
}
