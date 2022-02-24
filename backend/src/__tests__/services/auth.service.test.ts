import { findOne, create } from '../../services/repository.service';
import { signup, signin } from '../../services/auth.service';
import { Query } from 'mongoose';
import { User } from '../../models/user';

jest.mock('../../services/repository.service');
jest.mock('../../models/user');

const mockFindOne = findOne as jest.MockedFunction<typeof findOne>;
const mockCreate = create as jest.MockedFunction<typeof create>;


describe('Auth service', () => {

    describe('signup', () => {
        
        it('should return undefined if the user already exists!', async () => {
            mockFindOne.mockReturnValue({_id: '_id'} as unknown as Query<any,any>);
            
            const user = await signup('name', 'email', 'password');
            
            expect(user).toBeUndefined();
        });

    
        it('should create a new user with the right params!', async () => {
            const newUser = {name: 'name', email: 'email', password: 'password'};
            mockFindOne.mockReturnValue(null);
            jest.spyOn(User.prototype, 'constructor').mockReturnValueOnce(newUser);
            
            await signup('name', 'email', 'password');
            
            expect(mockCreate).toBeCalledWith(User, newUser);
        });
    });

    describe('login', () => {
        
        it('should return undefined if user not found!', async () => {
            mockFindOne.mockReturnValue({
                select: jest.fn().mockReturnValue(null)
            } as unknown as Query<any, any>);
            
            const user = await signin('email', 'password');

            expect(user).toBeUndefined();
        });

        it('should return undefined if password does not match!', async () => {
            mockFindOne.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    password: '123',
                    comparePassword: (password: string) => '123' === password
                })
            } as unknown as Query<any, any>);
            
            const user = await signin('email', '14');

            expect(user).toBeUndefined();
        });

    
        it('should return user and token!', async () => {
            mockFindOne.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    email: 'email',
                    password: '123',
                    comparePassword: (password: string) => '123' === password,
                    generateToken: () => 'token4'
                })
            } as unknown as Query<any, any>);
            
            const data = await signin('email', '123');

            expect(data.token).toBe('token4');
            expect(data.user.email).toBe('email');
        });
    });
})