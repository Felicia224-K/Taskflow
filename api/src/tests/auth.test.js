const request = require('supertest');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('../models');

// Build a minimal app for testing
const authRoutes = require('../routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const server = http.createServer(app);

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  server.listen(0);
});

afterAll(async () => {
  await sequelize.close();
  server.close();
});

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
  };

  test('POST /api/auth/register - should create a new account', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testUser.email);
  });

  test('POST /api/auth/register - should fail with duplicate email', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/auth/login - should login and return token', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - should fail with wrong password', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/auth/register - should fail with missing fields', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ email: 'incomplete@example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  test('GET /api/auth/me - should fail without token', async () => {
    const res = await request(server)
      .get('/api/auth/me');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});