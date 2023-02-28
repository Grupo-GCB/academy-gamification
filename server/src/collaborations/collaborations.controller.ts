import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RegisterCollaborationDto } from './dto/register-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';
import { CollaborationsService } from './use-cases/collaborations.service';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Post()
  create(@Body() createCollaborationDto: RegisterCollaborationDto) {
    return this.collaborationsService.create(createCollaborationDto);
  }

  @Get()
  findAll() {
    return this.collaborationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaborationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollaborationDto: UpdateCollaborationDto,
  ) {
    return this.collaborationsService.update(+id, updateCollaborationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaborationsService.remove(+id);
  }
}
