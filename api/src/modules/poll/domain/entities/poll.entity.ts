import { PollOptionEntity } from './poll-option.entity';

export class PollEntity {
  id: string;
  title: string;
  description: string | null;
  options: PollOptionEntity[];
  deadline: Date;
  status: string;
  accessCount: number;
  minimumQuorum: number;
  votesPerEmail: number;
  slug: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
