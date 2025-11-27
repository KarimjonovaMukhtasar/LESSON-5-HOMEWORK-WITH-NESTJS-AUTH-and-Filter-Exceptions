import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request, Response, NextFunction} from "express"

@Injectable()
export class LoggerMiddleWare implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log({message: `REQUEST REACHED SUCCESSFULLY!`,
            url: req.originalUrl,
            method: req.method,
            param: req.params,
            query: req.query,
            authorization: req.headers.authorization
        })
        next()
    }
}