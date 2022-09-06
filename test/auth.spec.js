const request = require('supertest');
const app = require ('../app');
const db = require('../db.js');
const routes = require('../routes/core.routes');
const routesCrud = require('../routes/crud.routes');

const prefix = process.env.API_PREFIX ? `/api/${ process.env.API_PREFIX }` : '/api';
var mongoose = require('mongoose');

const { User, Domain } = require('../models');

describe('Test signup process', () => {


	beforeAll(async () => {

		await db(async client => {
		  console.log("Base de datos conectada.");

		  routes(app, client);
		  routesCrud(app, client);

		  app.use((req, res, next) => {
		      res.status(404).send('Not Found');
	    	});

		}).catch(e => {
		  console.error(e)
		  app.route('/').get((req, res) => {
		      res.status(404).send("Database doesn't available");
		  });
		});

		await User.deleteOne({ email: 'aroldf@gmail.com' });

    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

	describe('GET /api/signup', () => {
		
		const user1 = { "countryCode":"CO", "email":"aroldf@gmail.com", "password":"12345678" };
		const authRequest = { "authMethod":"password", "email":"aroldf@gmail.com", "password":"12345678" };
		const expiredAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTFmNmMyY2E4MGU1MDU4NzQ5NWVmOCIsImVtYWlsIjoiYXJvbGRmQGdtYWlsLmNvbSIsInBlcm1pc2lvbnMiOltdLCJpYXQiOjE2NjIxMjE2NjYsImV4cCI6MTY2MjEyMTk2Nn0.6tG4h36qhQDSFngTRi78OespfK6Ht8Sys-fhx1mCF7Y';
		const expiredRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTFmNzdiYjNmN2U5YzYwNTdhMjI3MCIsImlhdCI6MTY2MjEyMTg1MiwiZXhwIjoxNjYyMTI1NDUyfQ.pgPsRvQa_IJLT8XnqZwjAe7FCNmOGK3nq_fx9Xph6Bw';
		let accessToken;
		let refreshToken;
		let response;

		beforeEach( async () => {
			
		});


		it('signup without parameters', async () => {
			response = await request(app).post(prefix+'/signup');
			expect(response.status).toBe(400);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('CountryCodeRequired');

		});

		it('signup with right data', async () => {

			response = await request(app).post(prefix+'/signup').send(user1);

			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.resultSet).toBeDefined();
			expect(response.body.resultSet._id).toBeDefined();
			expect(response.body.message).toBeDefined();
			expect(response.body.message).toBe('ok');

		});

		it('signin without parameters', async () => {

			response = await request(app).post(prefix+'/signin');
			expect(response.status).toBe(400);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('AuthMethodRequired');

		});

		it('signin with the new user', async () => {

			response = await request(app).post(prefix+'/signin').send(authRequest);

			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.resultSet).toBeDefined();
			expect(response.body.resultSet.accessToken).toBeDefined();
			expect(response.body.resultSet.refreshToken).toBeDefined();
			expect(response.body.message).toBeDefined();
			expect(response.body.message).toBe('ok');

			accessToken = response.body.resultSet.accessToken;
			refreshToken = response.body.resultSet.refreshToken;
			

		});

		it('test request without token', async () => {

			response = await request(app).post(prefix+'/test/user');
			expect(response.status).toBe(401);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('AccessTokenRequired');

		});

		it('test with malformed token', async () => {

			response = await request(app)
				.post(prefix+'/test/user')
				.set('Authorization', 'xxxxx');

			expect(response.status).toBe(401);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('AccessTokenInvalid');
			
		});

		it('test with access token expired', async () => {

			response = await request(app)
				.post(prefix+'/test/user')
				.set('Authorization', 'Bearer '+expiredAccessToken);
			
			expect(response.status).toBe(401);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('AccessTokenExpired');

		});

		it('test with valid access token', async () => {

			response = await request(app)
				.post(prefix+'/test/user')
				.set('Authorization', 'Bearer '+refreshToken);
				
			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.resultSet).toBeDefined();
			expect(response.body.resultSet.userId).toBeDefined();

		});

		
		it('refresh token without token', async () => {

			response = await request(app)
				.post(prefix+'/token/refresh');

			expect(response.status).toBe(401);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('RefreshTokenRequired');

		});

		it('refresh token with malformed refresh token', async () => {

			response = await request(app)
				.post(prefix+'/token/refresh')
				.send({ refreshToken: 'asdfasdf' });

			expect(response.status).toBe(401);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('RefreshTokenInvalid');

		});

		it('refresh token with expired refresh token', async () => {

			response = await request(app)
				.post(prefix+'/token/refresh')
				.send({ refreshToken: expiredRefreshToken });

			expect(response.status).toBe(401);
			expect(response.body.message).toBeDefined();
			expect(response.body.errorCode).toBe('RefreshTokenExpired');

		});

		it('refresh token with valid refresh token', async () => {

			response = await request(app)
				.post(prefix+'/token/refresh')
				.send({refreshToken: refreshToken});

			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.resultSet).toBeDefined();
			expect(response.body.resultSet.accessToken).toBeDefined();
			expect(response.body.message).toBeDefined();
			expect(response.body.message).toBe('ok');

		});


	});

});
