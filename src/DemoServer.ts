/**
 * Express Server file.
 *
 * created by Sean Maxwell Jan 21, 2019
 */

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';

import { Server } from '@overnightjs/core';
import { cimp, cinfo } from 'simple-color-print';


class DemoServer extends Server {

    private readonly _SERVER_START_MSG = 'Demo server started on port: ';
    private readonly _DEV_MSG = 'Express Server is running in development mode. Start the React ' +
        'development server "npm run start:react" to develop front-end content. Back-end is ' +
        'currently running on port: ';

    private _port = 3001;


    constructor() {
        super();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();

        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            this._serveFrontEndDev();
        } else {
            this._serveFrontEndProd();
        }
    }


    private setupControllers(): void {

        const ctlrInstances = [];

        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                let Controller = (controllers as any)[name];
                ctlrInstances.push(new Controller());
            }
        }

        super.addControllers(ctlrInstances);
    }


    private _serveFrontEndDev(): void {

        cinfo('Starting server in development mode');

        const msg = this._DEV_MSG + this._port;
        this.app.get('*', (req, res) => res.send(msg));
    }


    private _serveFrontEndProd(): void {

        cinfo('Starting server in production mode');

        this._port = 3002;

        const dir = path.join(__dirname, 'public/react/demo-react/');

        // Set the static and views directory
        this.app.set('views',  dir);
        this.app.use(express.static(dir));

        // Serve front-end content
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', {root: dir});
        });
    }


    public start(): void {
        this.app.listen(this._port, () => {
            cimp(this._SERVER_START_MSG + this._port);
        });
    }
}

export default DemoServer;
