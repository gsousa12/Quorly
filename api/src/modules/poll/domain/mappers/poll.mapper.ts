import { CreatePollRequestDto } from '../dtos/request/create-poll.request.dto';
import { PollListItemDto } from '../dtos/response/poll-list.response.dto';
import { PollOptionEntity } from '../entities/poll-option.entity';
import { PollEntity } from '../entities/poll.entity';

export class PollMapper {
  static async toMapperCreatePollRequest(request: CreatePollRequestDto): Promise<PollEntity> {
    const poll = new PollEntity();
    poll.title = request.title;
    poll.description = request.description;
    poll.options = request.options.map((text) => {
      const option = new PollOptionEntity();
      option.text = text;
      return option;
    });
    poll.deadline = request.deadline;
    poll.minimumQuorum = request.minimumQuorum;
    poll.votesPerEmail = request.votesPerEmail;

    return poll;
  }

  static toMapperGetPollListResponse(pollList: PollEntity[]): PollListItemDto[] {
    if (!pollList || pollList.length === 0) {
      return [];
    }

    return pollList.map((poll) => {
      const options = poll.options
        ? poll.options.map((option) => ({
            text: option.text,
          }))
        : [];

      return {
        id: poll.id,
        title: poll.title,
        description: poll.description,
        deadline: poll.deadline,
        status: poll.status,
        accessCount: poll.accessCount,
        minimumQuorum: poll.minimumQuorum,
        votesPerEmail: poll.votesPerEmail,
        slug: poll.slug,
        createdAt: poll.createdAt,
        options: options,
      };
    });
  }
}
