import { Controller, Get, Render, Redirect, Req, Res, Body, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { Adatok } from './Adatok.dto';
import { Response} from 'express';
import { error } from 'console';


@Controller()
export class AppController {
  #Adatok:Adatok[]=[];

  constructor(private readonly appService: AppService) {}

  @Get("")
  @Render('foglalas')
  getrHello(){
    return{
      data:{},
      errors:[]
    }
  }

  @Post('megadas')
  megadas(
    @Body() Adatok:Adatok,
    @Res() response:Response){
    
    console.log(Adatok);
    let errors=[];
    if(!Adatok.nev||!Adatok.email||!Adatok.datum||!Adatok.idopont||!Adatok.nezok)
    {
      errors.push("Minden mezőt ki kell tölteni!");
    }
    if(!/^[^\s@]+@[^\s@]+$/.test(Adatok.email))
    {
      errors.push("Nem megfelelő email formátum!");
    }
    if(errors.length>0)
    {
      response.render("foglalas", {
        data:Adatok,
        errors
      });
      return
    }
    const Megadas:Adatok={
      nev:Adatok.nev,
      email:Adatok.email,
      datum:Adatok.datum,
      idopont:Adatok.idopont,
      nezok:Adatok.nezok
    }
    this.#Adatok.push(Megadas);
    console.log(this.#Adatok);
    return response.redirect("/success");
  }


  @Get("success")
    @Render("success")
    rsuccess(){
      return;
  }

  @Post("vissza")
  vissza(@Res() response: Response){
    return response.redirect('/');
  }
}
