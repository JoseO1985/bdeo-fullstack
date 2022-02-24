import supertest from 'supertest';
import app from '../../../app';

describe('The register process', () => {

    it('should register a new user', async () => {
        const response = await supertest(app).post('/api/auth/login').send({
            name: 'name',
            email: 'email',
            password: 'password'
        });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
    })
});

