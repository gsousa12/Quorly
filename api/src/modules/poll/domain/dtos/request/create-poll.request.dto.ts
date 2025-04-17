export class CreatePollRequestDto {
  title: string;
  description: string | null;
  options: string[];
  deadline: Date;
  minimumQuorum: number;
  votesPerEmail: number;
}
