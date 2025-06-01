import { ArgumentMetadata, Injectable, PipeTransform,HttpStatus } from "@nestjs/common";
import { validate as isUUID } from "uuid";
import { AppException } from "../exceptions/app-exception";

Injectable()
export class ParseUUIDValidationPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata):string {
        if (!isUUID(value)) {
            throw new AppException('Invalid UUID format for id', HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}