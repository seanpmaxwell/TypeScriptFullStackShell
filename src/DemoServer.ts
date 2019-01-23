/**
 * Express Server file.
 *
 * created by Sean Maxwell Jan 21, 2019
 */

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { cimp, cinfo } from 'simple-color-print';
import DemoController from './controllers/demo/DemoController';


class DemoServer extends Server {

    private readonly _SERVER_START_MSG = 'Demo server started on port: ';
    private readonly _DEV_MSG = 'Express Server is running in development mode. Start the React ' +
        'development server "npm run start:react" to develop front-end content. Back-end is ' +
        'currently running on port: ';

    private _port = 3001;


    constructor() {
        super();

        // Setup json middleware
        this.app_.use(bodyParser.json());
        this.app_.use(bodyParser.urlencoded({extended: true}));

        // Setup the controllers
        this._setupControllers();

        // Point to front-end code
        if (process.env.NODE_ENV === 'development') {
            this._serveFrontEndDev();
        } else if (process.env.NODE_ENV === 'production') {
            this._serveFrontEndProd();
        }
    }


    private _setupControllers(): void {

        const demoController = new DemoController();

        const controllers = [];
        controllers.push(demoController);

        super.addControllers_(controllers);
    }


    private _serveFrontEndDev(): void {

        cinfo('Starting server in development mode');

        const msg = this._DEV_MSG + process.env.EXPRESS_PORT;
        this.app_.get('*', (req, res) => res.send(msg));
    }


    private _serveFrontEndProd(): void {

        cinfo('Starting server in production mode');

        this._port = 3002;

        const dir = path.join(__dirname, 'public/react/demo-react/');

        // Set the static and views directory
        this.app_.set('views',  dir);
        this.app_.use(express.static(dir));

        // Serve front-end content
        this.app_.get('*', (req, res) => {
            res.sendFile('index.html', {root: dir});
        });
    }


    public start(): void {
        this.app_.listen(this._port, () => {
            cimp(this._SERVER_START_MSG + this._port);
        });
    }
}


/**
 * Start the server
 */
(() => {
    const server = new DemoServer();
    server.start();
})();