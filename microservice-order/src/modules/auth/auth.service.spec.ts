import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { mockSignUp } from './auth.mock';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserModel = {};

  const MockAuthRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        AuthService,
        AuthRepository,
        JwtService,
      ],
    })
      .overrideProvider(AuthRepository)
      .useValue(MockAuthRepository)
      .compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('[Expect-Success] Should create subsidy pricing', async () => {
      MockAuthRepository.create().mockImplementation(() =>
        Promise.resolve(mockSignUp),
      );

      const result = await service.signUp(mockSignUp);

      expect(result).toEqual(mockSignUp);
    });
  });
});
