import { IsString } from 'class-validator';

export class CreateClaimCategoryDto {
  @IsString()
  name: string;
}
