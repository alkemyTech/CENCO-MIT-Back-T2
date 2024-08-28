import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Request,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  PartialUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from 'src/auth/decorators';
import { Role } from './entities';
import { UUID } from 'node:crypto';
import { Request as ExpressRequest } from 'express';
import { dummyUsers } from 'src/db';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    dummyUsers.forEach((u : CreateUserDto) => {
      this.create(u)
    })
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Get('country/:country')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  findByCountry(@Param('country') country: string) {
    return this.usersService.findByCountry(country);
  }

  @Get('info')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  getInfo(@Request() req: { request: ExpressRequest; user: PartialUserDto }) {
    const { user } = req;
    return this.usersService.getInfo(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/me/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  updatePassword(
    @Param('id') id: UUID,
    @Body() updatePassword: UpdatePasswordDto,
    @Request() req: { request: ExpressRequest; user: PartialUserDto },
  ) {
    const { user } = req;
    return this.usersService.updatePassword(id, updatePassword, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: UUID,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: { request: ExpressRequest; user: PartialUserDto },
  ) {
    const { user } = req;
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }
}
