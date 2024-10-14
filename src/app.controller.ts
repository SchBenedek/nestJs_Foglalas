import { Controller, Get, Render, Redirect, Req, Res, Body, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { Adatok } from './Adatok.dto';
import { Response, Request } from 'express';


@Controller()
export class AppController {
  #data:Adatok[]=[];

  constructor(private readonly appService: AppService) {}

  @Get('foglalas')
  @Render('foglalas')
  foglalas(){
    return{
      data:{},
      errors:[]
    }
  }

  @Post('foglalas')

}
