import { POLL_REPOSITORY } from '@common/tokens/repositories.tokens';
import { PaginationMeta } from '@common/utils/types';
import { PollEntity } from '@modules/poll/domain/entities/poll.entity';
import { IPollRepository } from '@modules/poll/domain/interfaces/poll-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PollService {
  constructor(@Inject(POLL_REPOSITORY) private readonly pollRepository: IPollRepository) {}

  async create(userId: number, poll: PollEntity): Promise<PollEntity> {
    const createdPoll = await this.pollRepository.create(userId, poll);
    return createdPoll;
  }

  async getPollList(
    userId: number,
    page: number,
    limit: number,
    title: string | null,
    status: string | null,
  ): Promise<{ meta: PaginationMeta; pollList: PollEntity[] | [] }> {
    const { meta, pollList } = await this.pollRepository.getPollList(userId, page, limit, title, status);

    return {
      meta,
      pollList,
    };
  }
}
