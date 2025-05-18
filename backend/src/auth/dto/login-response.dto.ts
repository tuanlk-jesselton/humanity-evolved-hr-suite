import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email!: string;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  full_name!: string;
}

export class LoginResponseDto {
  @ApiProperty({ 
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token!: string;

  @ApiProperty({ 
    description: 'User information',
    type: UserResponseDto,
  })
  user!: UserResponseDto;

  @ApiProperty({ 
    description: 'User roles',
    example: ['user', 'admin'],
    type: [String],
  })
  roles!: string[];
}
