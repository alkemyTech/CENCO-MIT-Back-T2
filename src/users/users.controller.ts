import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PartialUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':UUID')
  // findOne(@Param('UUID') UUID: string) {
  //   return this.usersService.findOne(UUID);
  // }

  @Get('/query')
  findByQuery(@Query('name') name: string, @Query('email') email: string) {
    return this.usersService.findByQuery({ name, email });
  }

  @Get('/country')
  findByCountry(@Query('country') country: string) {
    return this.usersService.findByCountry(country);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: PartialUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
