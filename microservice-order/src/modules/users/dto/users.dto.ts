import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { objectId } from 'src/common/type/objectId.type';

export class userUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email!: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string | null;
}

export class objectIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: objectId;
}
