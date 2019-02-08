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
    private sayHello(req: Request, res: Response): void {

        try {

            const name = req.params.name;

            if (name === 'makeitfail') {
                throw Error('User triggered failure');
            }

            cinfo('API: "GET /api/say-hello/:name" called with param: ' + name);

            res.status(250).json({response: this.SUC_MSG});
        } catch (err) {
            cerr(err);
            res.status(400).json({response: this.ERR_MSG});
        }
    }
}

export default DemoController;
