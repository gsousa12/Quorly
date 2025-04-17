import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PollController } from './presentation/controllers/poll.controller';
import { POLL_REPOSITORY } from '@common/tokens/repositories.tokens';
import { PollRepository } from './infrastructure/repositories/poll.repository';
import { PollService } from './application/services/poll.service';

@Module({
  imports: [PrismaModule],
  controllers: [PollController],
  providers: [
    {
      provide: POLL_REPOSITORY,
      useClass: PollRepository,
    },
    PollService,
  ],
})
export class PollModule {}
