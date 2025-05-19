import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAuditTrailDto {
  @IsString()
  actionType: string;

  @IsOptional()
  @IsInt()
  actorId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  timestamp?: Date;
}
