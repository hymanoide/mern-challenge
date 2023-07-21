const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Post = require('../models/post');
const {mongoDBConnectionString} = require('../config/config');


// Establish db connection before all test
beforeAll(async () => {
    await mongoose.connect(mongoDBConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Close Db connection after all test
afterAll(async () => {
    await mongoose.connection.close();
});

const mockPosts = [
    {title: 'Mock 1', content: 'Mock content 1', cuid: 'mock-cuid1', slug: 'mock-slug', name: 'mock-test-user'},
    {title: 'Mock 2', content: 'Mock content 2', cuid: 'mock-cuid2', slug: 'mock-slug', name: 'mock-test-user'},
    {title: 'Mock 3', content: 'Mock content 3', cuid: 'mock-cuid3', slug: 'mock-slug', name: 'mock-test-user'},
];

describe('GET /api/posts', () => {
    beforeEach(async () => {
        // Insert mockPosts into db
        await Post.insertMany(mockPosts);
    });

    afterEach(async () => {
        // Get all cuids of mockPost
        const cuids = mockPosts.map(post => post.cuid);

        // Delete docs inserted before
        await Post.deleteMany({cuid: {$in: cuids}});
    });

    it('should respond with status 200 and all posts', async () => {

        const response = await request(app).get('/api/posts');

        expect(response.status).toBe(200);

        expect(response._body.posts.length).toBeGreaterThanOrEqual(mockPosts.length);

        // Normalize arrays to keep same estructure and compare them correctly.
        const cleanMockPosts = mockPosts.map(({cuid, title, content}) => ({cuid, title, content}));
        const expectedPosts = response._body.posts.map(({cuid, title, content}) => ({cuid, title, content}));

        // Verify expected posts conains this test's mockPosts
        expect(expectedPosts).toEqual(expect.arrayContaining(cleanMockPosts));
    });
});
