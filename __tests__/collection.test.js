const app = require('./../express');
const supertest = require('supertest');
const request = supertest(app);

//Fetch Campaign by Id
it('Fetch Camapign by ID', async done => {
	const response = await request.get('/api/campaigns/2c4b12d4-84a1-4698-a9f2-3a436728110e');

	expect(response.status).toBe(200);
	expect(typeof response.body).toBe('object');
	expect(response.body.message).toBe('Successfully Fetched Campaign By Id');

	done();
});

it('Failed Fetch Camapign by ID when no id was given', async done => {
	const response = await request.get(`/api/campaigns/${null}`);

	expect(response.status).toBe(400);
	expect(response.body.error).toBe('Campaign not found');

	done();
});

//Fetch Campaign by status
it('Fetch Camapign by Status', async done => {
	const response = await request.get('/api/campaigns/status/Pending');

	expect(response.status).toBe(200);
	expect(typeof response.body).toBe('object');
	expect(response.body.message).toBe('Successfully Fetched Campaign By Status');

	done();
});

it('Failed Fetch Camapign by status with wrong param', async done => {
	const response = await request.get(`/api/campaigns/status/${null}`);

	expect(response.status).toBe(400);
	expect(response.body.error).toBe('Campaign not found');

	done();
});

//Fetch Ad Group By Campaign Id
it('Fetch Ad Group By Campaign Id', async done => {
	const response = await request.get('/api/campaign/adgroups/2c4b12d4-84a1-4698-a9f2-3a436728110e');

	expect(response.status).toBe(200);
	expect(typeof response.body).toBe('object');
	expect(response.body.message).toBe('Successfully Fetched Ad Groups By Campaign ID');

	done();
});

it('Failed Fetch Ad Groups By Campaign Id with wrong param', async done => {
	const response = await request.get(`/api/campaign/adgroups/${null}`);

	expect(response.status).toBe(400);
	expect(response.body.error).toBe('AdGroups not found');

	done();
});

//Fetch Ad by date Range
it('Fetch Ad by date Range with time', async done => {
	const response = await request.get(
		'/api/ads/b8f2c15d-f046-4040-9291-7efab796440e/2020-01-13 13:11:06/2020-01-30 13:11:06'
	);

	expect(response.status).toBe(200);
	expect(typeof response.body).toBe('object');
	expect(response.body.message).toBe('Successfully Fetched AdStats by date range');

	done();
});

it('Fetch Ad by date Range without time', async done => {
	const response = await request.get('/api/ads/b8f2c15d-f046-4040-9291-7efab796440e/2020-01-13/2020-01-30');

	expect(response.status).toBe(200);
	expect(typeof response.body).toBe('object');
	expect(response.body.message).toBe('Successfully Fetched AdStats by date range');

	done();
});

it('Failed to Fetch Ad by date Range with wrong params', async done => {
	const response = await request.get(`/api/ads/b8f2c15d-f046-4040-9291-7efab796440e/${null}/${null}`);

	expect(response.status).toBe(400);
	expect(response.body.error).toBe('Ads Stats not found');

	done();
});

//Update Campaign
it('Update Campaign', async done => {
	const response = await request
		.put('/api/update/campaign/2c4b12d4-84a1-4698-a9f2-3a436728110e')
		.send('goal=Sales') // x-www-form-urlencoded upload
		.set('Accept', 'application/json');

	expect(response.status).toBe(200);
	expect(response.body.message).toBe('Campaign updated successfully');

	done();
});

it('Failed Update Campaign with wrong params', async done => {
	const response = await request
		.put(`/api/update/campaign/2c4b12d4-84a1-4698-a9f2-3a436728110e`)
		.send() // x-www-form-urlencoded upload
		.set('Accept', 'application/json');

	expect(response.status).toBe(400);
	expect(response.body.error).toBe('Campaign not updated successfully');

	done();
});
