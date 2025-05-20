
import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user',
  })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  full_name: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT token for authentication',
  })
  token: string;

  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    example: ['Employee', 'Manager'],
    description: 'User roles',
    isArray: true,
    type: String,
  })
  roles: string[];
}
