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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './dto';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from 'src/auth/decorators';
import { Role } from './entities';
import { UUID } from 'node:crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll(
    @Query('country') country?: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    return this.usersService.findAll(country, name, email);
  }


  @Get(':id/info')
  @UseGuards(AuthGuard)
  getInfo(@Param('id') id: UUID) {
    return this.usersService.getInfo(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/me/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  updatePassword(
    @Param('id') id: UUID,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePassword);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }
}
