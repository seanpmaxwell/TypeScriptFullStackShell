/**
 * Demo Controller file.
 *
 * created by Sean Maxwell Jan 21, 2019
 */

import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { cinfo, cerr } from 'simple-color-print';


@Controller('api/say-hello')
class DemoController {

    public readonly SUC_MSG = 'hello';
    public readonly ERR_MSG = 'can\'t say hello';


    @Get(':name')
    private async sayHello(req: Request, res: Response): Promise<void> {

        try {
            cinfo('API: "GET /api/say-hello" called with the name param: ' + req.params.name);
            res.status(250).json({response: this.SUC_MSG});
        } catch (err) {
            cerr(err);
            res.status(400).json({response: this.ERR_MSG});
        }
    }
}

export default DemoController;