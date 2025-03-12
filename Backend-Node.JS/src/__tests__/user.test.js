import request from 'supertest';
import app from '../server';

let server;

beforeAll((done) => {
    server = app.listen(0, () => {
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('User API Endpoints', () => {
    let userId;

    // Test get list users
    describe('GET /user/getlistuser', () => {
        it('should return list of users', async () => {
            const res = await request(server)
                .get('/user/getlistuser');
            
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test create new user
    describe('POST /user/createuser', () => {
        it('should create a new user', async () => {
            const userData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                password: 'password123'
            };

            const res = await request(server)
                .post('/user/createuser')
                .send(userData);
            
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            userId = res.body.id; // Save for later tests
        });

        it('should fail if required fields are missing', async () => {
            const invalidData = {
                firstName: 'Test'
                // Missing other required fields
            };

            const res = await request(server)
                .post('/user/createuser')
                .send(invalidData);
            
            expect(res.statusCode).toBe(500);
        });
    });

    // Test get user by ID
    describe('GET /user/getuserbyid', () => {
        it('should return user by ID', async () => {
            const res = await request(server)
                .get(`/user/getuserbyid?id=${userId}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', userId);
        });

        it('should return 404 for non-existent user', async () => {
            const res = await request(server)
                .get('/user/getuserbyid?id=99999');
            
            expect(res.statusCode).toBe(404);
        });
    });

    // Test update user
    describe('PUT /user/updateuser', () => {
        it('should update user details', async () => {
            const updateData = {
                id: userId,
                firstName: 'Updated',
                lastName: 'Name'
            };

            const res = await request(server)
                .put('/user/updateuser')
                .send(updateData);
            
            expect(res.statusCode).toBe(200);
        });
    });

    // Test delete user
    describe('DELETE /user/deleteuser', () => {
        it('should delete user', async () => {
            const res = await request(server)
                .delete(`/user/deleteuser?id=${userId}`);
            
            expect(res.statusCode).toBe(200);
        });
    });
}); 