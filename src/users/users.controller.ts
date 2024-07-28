import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PartialUserDto } from './dto';
import { RolesGuard } from '../auth/guards';
import { Roles } from 'src/auth/decorators';
import { Role } from './entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/country')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async findByCountry(@Query('country') country: string) {
    return this.usersService.findByCountry(country);
  }

  @Get('/query')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findByQuery(@Query('name') name: string, @Query('email') email: string) {
    return this.usersService.findByQuery({ name, email });
  }


  @Get(':UUID')
  findOne(@Param('UUID') UUID: string) {
    return this.usersService.findOne(UUID);
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
