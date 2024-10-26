import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GenerateCombinationDto } from './dtos/generate-combination.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate')
  async generate(@Body() data: GenerateCombinationDto){
    const result = await this.appService.generateCombination(data.items, data.length);
    return { message:"success", result };
  }
}
