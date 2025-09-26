import { IsInt, IsString } from 'class-validator';

export class RefreshDto {
  @IsInt()
  userId: number;

  @IsString()
  refreshToken: string;
}