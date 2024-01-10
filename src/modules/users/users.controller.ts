import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Constants } from 'src/utils/constant.utils';
import { Request } from 'express';

@Controller({
  path: 'users',
  version: Constants.API_VERSION_1,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req: Request) {
    const user = req['user'];
    return this.usersService.findOne(user.id);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.remove(id);
  }
}
