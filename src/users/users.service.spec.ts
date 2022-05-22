import { Test, TestingModule } from '@nestjs/testing';
import '../../test/support';
import { DatabaseModule } from '../database/database.module';
import { CreateUserDto } from './users.dto';
import { usersProviders } from './users.proviers';
import { UsersService } from './users.service';

const testUser: CreateUserDto = {
  username: 'test',
  password: 'P@ssw0rd',
  email: 'test@test.com',
};

describe('UsersService', () => {
  let service: UsersService;
  let user: User;

  register(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: usersProviders,
    }).compile();

    service = module.get<UsersService>(UsersService);
    return () => module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register()', async () => {
    user = (await service.register(testUser)).toObject();
    expect(user.username).toEqual(testUser.username);
  });

  it('findOne()', async () => {
    let { email, username } = testUser;
    user = (await service.findOne({ username })).toObject();
    expect(user.email).toEqual(email);
    expect(user.username).toEqual(username);
  });

  it('authenticate()', async () => {
    let { username, password } = testUser;
    let result = await service.authenticate(username, password);
    expect(result.user.email).toEqual(user.email);
  });

  it('deleteOne()', async () => {
    let { deletedCount } = await service.deleteOne(user);
    expect(deletedCount).toEqual(1);
  });
});
