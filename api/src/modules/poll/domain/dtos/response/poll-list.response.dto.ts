export class PollOptionDto {
  text: string;
}

export class PollListItemDto {
  title: string;
  description: string | null;
  deadline: Date;
  status: string;
  accessCount: number;
  minimumQuorum: number;
  votesPerEmail: number;
  slug: string;
  createdAt: Date;
  options: PollOptionDto[];
}
