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

        if (process.env.LOCAL) {
            const dir = path.join(__dirname, 'public/react/demo-react/');
            this.app_.set('views',  dir);
            this.app_.use(express.static(dir));
            this.app_.get('*', (req, res) => {
                res.sendFile('index.html', {root: dir});
            });
        } else {
            // setup aws connection information here
        }
    }


    public start(): void {
        const port = 3001;
        this.app_.listen(port, () => cimp(this._SERVER_START_MSG + port));
    }
}


/**
 * Start the server
 */
(() => {
    const server = new DemoServer();
    server.start();
})();