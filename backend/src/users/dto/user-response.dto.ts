import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PermissionResponseDto {
  @ApiProperty({ example: 'user:read' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Permission description' })
  @Expose()
  description: string;
}

export class UserRoleResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ description: 'Role name' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Role description' })
  @Expose()
  description: string;

  @ApiProperty({ 
    type: [PermissionResponseDto],
    description: 'List of permissions associated with this role',
    required: false 
  })
  @Expose()
  @Type(() => PermissionResponseDto)
  permissions?: PermissionResponseDto[];
}

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'User email address' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'User full name' })
  @Expose()
  full_name: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @Expose()
  phone_number?: string;

  @ApiProperty({ description: 'User position', required: false })
  @Expose()
  position?: string;

  @ApiProperty({ description: 'URL to user avatar', required: false })
  @Expose()
  avatar_url?: string;

  @ApiProperty({ description: 'Company ID the user belongs to', required: false })
  @Expose()
  company_id?: number;

  @ApiProperty({ description: 'Department ID the user belongs to', required: false })
  @Expose()
  department_id?: number;

  @ApiProperty({ description: 'Whether the user is active', default: true })
  @Expose()
  is_active: boolean;

  @ApiProperty({ description: 'Whether the user is verified', default: false })
  @Expose()
  is_verified: boolean;

  @ApiProperty({ description: 'Date when the user was created' })
  @Expose()
  created_at: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  @Expose()
  updated_at: Date;

  @ApiProperty({ description: 'Date of last login', required: false })
  @Expose()
  last_login_at?: Date;

  @ApiProperty({ 
    type: [UserRoleResponseDto],
    description: 'List of roles assigned to the user',
    required: false 
  })
  @Expose()
  @Type(() => UserRoleResponseDto)
  roles?: UserRoleResponseDto[];

  @ApiProperty({
    type: [String],
    description: 'List of all permissions the user has through their roles',
    required: false
  })
  @Expose()
  permissions?: string[];

  @ApiProperty({
    description: 'User metadata or additional information',
    type: 'object',
    required: false,
    additionalProperties: { type: 'string' }
  })
  @Expose()
  metadata?: Record<string, string>;
}
