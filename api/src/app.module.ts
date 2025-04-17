import { JwtAuthGuard } from '@common/guard/jwt.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { PollModule } from '@modules/poll/poll.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, PollModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
