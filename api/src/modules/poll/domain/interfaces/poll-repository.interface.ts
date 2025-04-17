import { PaginationMeta } from '@common/utils/types';
import { PollEntity } from '../entities/poll.entity';

export interface IPollRepository {
  create(userId: number, poll: PollEntity): Promise<PollEntity>;
  getPollList(
    userId: number,
    page: number,
    limit: number,
    title: string | null,
    status: string | null,
  ): Promise<{ meta: PaginationMeta; pollList: PollEntity[] | [] }>;
}
