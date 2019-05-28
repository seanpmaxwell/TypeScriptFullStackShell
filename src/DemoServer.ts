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
import { Logger } from '@overnightjs/logger';


class DemoServer extends Server {

    private readonly SERVER_START_MSG = 'Demo server started on port: ';
    private readonly DEV_MSG = 'Express Server is running in development mode. Not front-end ' +
        'content is being served.';


    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            Logger.Info('Starting server in development mode');
            this.app.get('*', (req, res) => res.send(this.DEV_MSG));
        } else {
            this.serveFrontEndProd();
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
        this.showLogs = true;
        super.addControllers(ctlrInstances);
    }


    private serveFrontEndProd(): void {
        const dir = path.join(__dirname, 'public/react/demo-react/');
        // Set the static and views directory
        this.app.set('views',  dir);
        this.app.use(express.static(dir));
        // Serve front-end content
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', {root: dir});
        });
    }


    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}

export default DemoServer;
