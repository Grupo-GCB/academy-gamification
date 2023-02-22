import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { AcademysService } from './use-cases/academys.service';

@Controller('academys')
export class AcademysController {
  constructor(private readonly academysService: AcademysService) {}

  @Post()
  create(@Body() createAcademyDto: CreateAcademyDto) {
    return this.academysService.create(createAcademyDto);
  }

  @Get()
  findAll() {
    return this.academysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademyDto: UpdateAcademyDto) {
    return this.academysService.update(+id, updateAcademyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academysService.remove(+id);
  }
}
