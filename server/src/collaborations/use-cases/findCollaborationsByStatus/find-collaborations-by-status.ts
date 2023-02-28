import { Injectable } from '@nestjs/common';

import { ICollaborationsRepository } from '@collaborations/interfaces';

@Injectable()
export class FindByStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}
}
