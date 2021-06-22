import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ContractorsService } from './contractors.service';
import { CreateContractorDto } from './dto/create-contractor.dto';
import * as fs from "fs";
import * as path from "path";

@Controller('contractors')
export class ContractorsController {

    constructor(private readonly contractorsService: ContractorsService) { }

    @Post('/create')
    @ApiBody({ type: CreateContractorDto })
    async createOne(@Body() createContractorDto: CreateContractorDto) {
        
        try {

            fs.appendFileSync('test1.txt', 'hello world. this is a new text file\t');
            let file = fs.readFileSync('./test1.txt','utf-8');

            return { createContractorDto, file };

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Get(':name/:email/:address/:age')
    async findOne(@Param('name') name: string, @Param('email') email: string,  @Param('address') address: string, @Param('age') age: string   ): Promise<any> {
        try {

            
            //let result = await this.contractorsService.findOne(id);
            let result = {name: name, email: email, address: address, age: age};
            if (!result) { throw new HttpException('Contractor is not found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Get('/getBody')
    async getBody(@Body('name') name, @Body('email') email, @Body('address') address, @Body('age') age  ): Promise<any> {
        try {

            fs.appendFileSync('test2.txt', 'hello world. this is a new text file\t');
            let file = fs.readFileSync('./test2.txt','utf-8');
            let result = {name: name, email: email, address: address, age:age, file: file };

            //console.log(path.join(file));

            if (!result) { throw new HttpException('Contractor is not found', HttpStatus.NOT_FOUND) }
            return result;



        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}

