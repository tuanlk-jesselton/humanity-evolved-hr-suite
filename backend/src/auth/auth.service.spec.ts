import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';

describe('AuthService', () => {
  let service: AuthService;
  
  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockUserRoleRepository = {
    find: jest.fn(),
  };

  const mockRoleRepository = {
    find: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserRole),
          useValue: mockUserRoleRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: await bcrypt.hash('password123', 10),
        full_name: 'Test User',
      };

      const mockRoles = [
        { id: 1, name: 'admin' },
      ];

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRoleRepository.find.mockResolvedValue([{ role_id: 1 }]);
      mockRoleRepository.find.mockResolvedValue(mockRoles);
      mockJwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.login('test@example.com', 'password123');
      
      expect(result).toHaveProperty('token');
      expect(result.token).toBe('mock-jwt-token');
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.login('nonexistent@example.com', 'password123'))
        .rejects
        .toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: await bcrypt.hash('password123', 10),
        full_name: 'Test User',
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.login('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow(UnauthorizedException);
    });
  });
});
