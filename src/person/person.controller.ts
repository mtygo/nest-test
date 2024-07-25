import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UseFilters,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { LoginGuard } from 'src/login.guard';
import { TimeInterceptor } from 'src/time.interceptor';
import { ValidatePipe } from 'src/validate.pipe';
import { TestFilter } from 'src/test.filter';
import { DeleteDto } from './dto/delete-person.dto';

@Controller('person')
// @UseInterceptors(TimeInterceptor)
// @UseFilters(TestFilter)
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('create')
  @UseGuards(LoginGuard)
  create(@Body(new ValidationPipe()) createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Post('del')
  del(@Body() deleteDto: DeleteDto) {
    throw new HttpException(
      `测试异常：${deleteDto?.id}`,
      HttpStatus.BAD_REQUEST,
    ); // 抛出异常
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get('selectId')
  findOne(@Query('id', ValidatePipe) id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
