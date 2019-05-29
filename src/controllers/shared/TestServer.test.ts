/**
 * JobApp ExpressJS webserver
 *
 * created by Sean Maxwell Jan 19, 2019
 */

import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { Server } from '@overnightjs/core';


class TestServer extends Server {


    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }


    public setController(ctlr: object): void {
        super.addControllers(ctlr);
    }


    public getExpressInstance(): Application {
        return this.app;
    }
}

export default TestServer;
