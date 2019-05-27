/**
 * Unit-tests for the DemoController
 *
 * created by Sean Maxwell, 1/21/2019
 */

import * as supertest from 'supertest';

import {} from 'jasmine';
import { SuperTest, Test } from 'supertest';
import { Logger } from '@overnightjs/logger';

import TestServer from '../shared/TestServer.test';
import DemoController from './DemoController';


describe('DemoController', () => {

    const demoController = new DemoController();
    let agent: SuperTest<Test>;


    beforeAll(done => {
        const server = new TestServer();
        server.setController(demoController);
        agent = supertest.agent(server.getExpressInstance());
        done();
    });


    describe('API: "/api/say-hello/:name"', () => {

        const { SUCCESS_MSG, ERR_MSG } = DemoController;

        it(`should return a JSON object with the message "${SUCCESS_MSG}" and a status code of 250
            if message was successful`, done => {

            agent.get('/api/say-hello/seanmaxwell')
                .end((err, res) => {
                    if (err) {
                        Logger.Err(err, true);
                    }
                    expect(res.status).toBe(250);
                    expect(res.body.response).toBe(SUCCESS_MSG);
                    done();
                });
        });

        it(`should return a JSON object with the message "${ERR_MSG}" and a status code of 400
            if message was unsuccessful`, done => {

            agent.get('/api/say-hello/makeitfail')
                .end((err, res) => {
                    if (err) {
                        Logger.Err(err, true);
                    }
                    expect(res.status).toBe(400);
                    expect(res.body.response).toBe(ERR_MSG);
                    done();
                });
        });
    });
});
