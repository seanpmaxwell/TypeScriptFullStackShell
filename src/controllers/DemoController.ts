/**
 * Controller for users on the Dashboard to send us emails.
 *
 * created by Sean Maxwell Jan 21, 2019
 */

import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { cinfo, cerr } from 'simple-color-print';


@Controller('api/send-email')
class DemoController {

    public readonly SUC_MSG = 'hello';
    public readonly ERR_MSG = 'cant say hello';


    @Get()
    private async sayHello(req: Request, res: Response): Promise<void> {

        const resp = {
            response: this.SUC_MSG,
            yourMsg: req.body.yourMessage
        };

        try {
            cinfo('Get "api/send-email" called.');
            res.status(250).json(resp);
        } catch (err) {
            cerr(err);
            res.status(400).json({response: this.ERR_MSG});
        }
    }
}

export default DemoController;