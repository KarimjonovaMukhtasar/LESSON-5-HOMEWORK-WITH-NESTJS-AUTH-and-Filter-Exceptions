import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class customAllExceptionsFilter implements ExceptionFilter{
        catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req = ctx.getRequest()
        const res = ctx.getResponse()
        const next = ctx.getNext()
        const statusCode = exception.getStatus()
        console.log(`SIGN`, exception);
        let check = host
        res.status(statusCode).json({
            message: exception.message,
            statusCode,
            timestamp: new Date(),
            path: req.path,
            url: req.originalUrl
        })
    }  
        
}