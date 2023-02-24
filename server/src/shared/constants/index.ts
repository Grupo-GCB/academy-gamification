import { DoubtsSolvedDTO } from '@collaborations/dto/doubts-solved.dto';
import { TeamCeremonyDTO } from '@collaborations/dto/team-ceremony.dto';

export enum Collaborations {
  CodeReview = 'code review',
  AcademyCommitee = 'participação em comitê academy',
  TeamCeremony = 'cerimônia de time',
  PairProgramming = 'pair programming',
  DoubtsSolved = 'direcionamento ou dúvidas',
  LogicalChallenge = 'desafio de lógica',
  AcademyRate = 'avaliação de academy',
}

export type AcademyCollaboration = DoubtsSolvedDTO | TeamCeremonyDTO;
