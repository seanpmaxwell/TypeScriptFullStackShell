/**
 * Demo Controller file.
 *
 * created by Sean Maxwell Jan 21, 2019
 */

import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';


@Controller('api/say-hello')
class DemoController {

    public static readonly SUCCESS_MSG = 'hello';
    public static readonly ERR_MSG = 'can\'t say hello';


    @Get(':name')
    private sayHello(req: Request, res: Response) {
        try {
            if (req.params.name === 'makeitfail') {
                throw Error('User triggered failure');
            }
            Logger.Info('API: "GET /api/say-hello/:name" called with param: ' + name);
            res.status(250).json({
                response: DemoController.SUCCESS_MSG,
            });
        } catch (err) {
            Logger.Err(err, true);
            res.status(400).json({
                response: DemoController.ERR_MSG,
            });
        }
    }
}

export default DemoController;
