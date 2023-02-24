import { RegisterAcademyDto } from '@academys/dto/create-academy.dto';
import { Injectable } from '@nestjs/common';
import { UpdateAcademyDto } from '../dto/update-academy.dto';

@Injectable()
export class AcademysService {
  create(register: RegisterAcademyDto) {
    return 'This action adds a new academy';
  }

  findAll() {
    return `This action returns all academys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} academy`;
  }

  update(id: number, updateAcademyDto: UpdateAcademyDto) {
    return `This action updates a #${id} academy`;
  }

  remove(id: number) {
    return `This action removes a #${id} academy`;
  }
}
