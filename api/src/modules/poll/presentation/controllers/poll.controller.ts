import { createApiResponse } from '@common/utils/api-response';
import { ITEMS_PER_PAGE } from '@common/utils/constants';
import { PollService } from '@modules/poll/application/services/poll.service';
import { CreatePollRequestDto } from '@modules/poll/domain/dtos/request/create-poll.request.dto';
import { PollMapper } from '@modules/poll/domain/mappers/poll.mapper';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request } from '@nestjs/common';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createPoll(@Body() request: CreatePollRequestDto, @Request() req) {
    const userId = Number(req.user.sub);

    const poll = await PollMapper.toMapperCreatePollRequest(request);
    const createdPoll = await this.pollService.create(+userId, poll);
    // Mapear response
    return createApiResponse('Votação criada com sucesso', createdPoll);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getPollList(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('title') title: string | null,
    @Query('status') status: string | null,
  ) {
    const userId = Number(req.user.sub);
    const limit = ITEMS_PER_PAGE;

    const { meta, pollList } = await this.pollService.getPollList(userId, page, limit, title, status);
    const response = PollMapper.toMapperGetPollListResponse(pollList);
    return createApiResponse('Lista de usuários', response, meta);
  }
}
