import { IsEmail, IsNotEmpty, IsString, MinLength, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
    required: true,
  })
  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'your-secure-password',
    required: true,
    minLength: 6,
  })
  @IsDefined({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { 
    message: 'Password is too short. Minimum length is 6 characters' 
  })
  password!: string;
}
