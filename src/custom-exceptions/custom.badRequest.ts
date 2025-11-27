import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { timestamp } from "rxjs";

@Injectable()
export class CustomBadRequest extends BadRequestException{
    constructor(message: string,  statusCode: number = HttpStatus.BAD_REQUEST ){
    super(
      {
        success: false,
        statusCode,
        message,
        timestamp: new Date()
      }
    );
    }
}