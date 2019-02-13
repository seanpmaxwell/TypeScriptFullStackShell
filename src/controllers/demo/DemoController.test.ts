/**
 * Unit-tests for the DemoController
 *
 * created by Sean Maxwell, 1/21/2019
 */

import * as supertest from 'supertest';

import {} from 'jasmine';
import { SuperTest, Test } from 'supertest';
import { cerr } from 'simple-color-print';

import TestServer from '../shared/TestServer.test';
import DemoController from './DemoController';


describe('DemoController', () => {

    const demoController = new DemoController();
    let agent: SuperTest<Test>;


    beforeAll(done => {

        // Activate the routes
        const server = new TestServer();
        server.setController(demoController);

        // Start supertest
        agent = supertest.agent(server.getExpressInstance());
        done();
    });


    describe('API: "/api/say-hello/:name"', () => {

        const { SUC_MSG, ERR_MSG } = demoController;

        it(`should return a JSON object with the message "${SUC_MSG}" and a status code of 250
            if message was successful`, done => {

            agent.get('/api/say-hello/seanmaxwell')
                .end((err, res) => {

                    if (err) { cerr(err); }

                    expect(res.status).toBe(250);
                    expect(res.body.response).toBe(SUC_MSG);
                    done();
                });
        });

        it(`should return a JSON object with the message "${ERR_MSG}" and a status code of 400
            if message was unsuccessful`, done => {

            agent.get('/api/say-hello/makeitfail')
                .end((err, res) => {

                    if (err) { cerr(err); }

                    expect(res.status).toBe(400);
                    expect(res.body.response).toBe(ERR_MSG);
                    done();
                });
        });
    });
});
