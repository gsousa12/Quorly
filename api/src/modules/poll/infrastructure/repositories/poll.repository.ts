import { PollStatus } from '@common/utils/enum';
import { PollEntity } from '@modules/poll/domain/entities/poll.entity';
import { PollOptionEntity } from '@modules/poll/domain/entities/poll-option.entity';
import { IPollRepository } from '@modules/poll/domain/interfaces/poll-repository.interface';
import { PrismaService } from '@modules/prisma/application/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationMeta } from '@common/utils/types';

@Injectable()
export class PollRepository implements IPollRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, poll: PollEntity): Promise<PollEntity> {
    const createdPoll = await this.prisma.poll.create({
      data: {
        title: poll.title,
        description: poll.description,
        deadline: poll.deadline,
        status: PollStatus.ACTIVE,
        minimumQuorum: poll.minimumQuorum,
        votesPerEmail: poll.votesPerEmail,
        user: {
          connect: { id: userId },
        },
        options: {
          create: poll.options.map((option) => ({
            text: option.text,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    const pollEntity = new PollEntity();
    pollEntity.id = createdPoll.id;
    pollEntity.title = createdPoll.title;
    pollEntity.description = createdPoll.description;
    pollEntity.deadline = createdPoll.deadline;
    pollEntity.status = createdPoll.status;
    pollEntity.accessCount = createdPoll.accessCount;
    pollEntity.minimumQuorum = createdPoll.minimumQuorum;
    pollEntity.votesPerEmail = createdPoll.votesPerEmail;
    pollEntity.slug = createdPoll.slug;
    pollEntity.userId = createdPoll.userId;
    pollEntity.createdAt = createdPoll.createdAt;
    pollEntity.updatedAt = createdPoll.updatedAt;
    pollEntity.options = createdPoll.options.map((option) => {
      const optionEntity = new PollOptionEntity();
      optionEntity.id = option.id;
      optionEntity.text = option.text;
      optionEntity.pollId = option.pollId;
      return optionEntity;
    });

    return pollEntity;
  }

  async getPollList(
    userId: number,
    page: number,
    limit: number,
    title: string | null,
    status: string | null,
  ): Promise<{ meta: PaginationMeta; pollList: PollEntity[] | [] }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {
      userId: userId,
    };

    if (title) {
      whereClause.title = { contains: title, mode: 'insensitive' };
    }

    if (status && [PollStatus.ACTIVE, PollStatus.CLOSED].includes(status as PollStatus)) {
      whereClause.status = { contains: status, mode: 'insensitive' };
    }

    const [pollList, totalCount] = await Promise.all([
      this.prisma.poll.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: { options: true },
      }),
      this.prisma.poll.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
      pollList: pollList,
    };
  }
}
