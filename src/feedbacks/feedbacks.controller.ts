import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { Feedback, FeedbackType } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpadateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo Feedback Pulse' })
  @ApiResponse({ status: 201, type: Feedback })
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbacksService.createFeedbackPulse(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os Feedbacks Pulse' })
  @ApiResponse({ status: 200, type: [Feedback] })
  async findAllFeedbacks(
    @Query('type') type?: FeedbackType,
    @Query('collaboratorId') collaboratorId?: string,
  ): Promise<Feedback[]> {
    return this.feedbacksService.findAllFeedbackPulse({ type, collaboratorId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter o feedback Pulse por ID' })
  @ApiResponse({ status: 200, type: Feedback })
  async findOneFeedback(@Param('id') id: string): Promise<Feedback> {
    return this.feedbacksService.findOneFeedbackPulse(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um Feedback Pulse' })
  @ApiResponse({ status: 200, type: Feedback })
  async updateFeedback(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpadateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbacksService.updateFeedbackPulse(id, updateFeedbackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um Feedback Pulse' })
  @ApiResponse({ status: 204 })
  async removeFeedback(@Param('id') id: string): Promise<void> {
    return this.feedbacksService.removeFeedbackPulse(id);
  }

  @Get('collaborator/:collaboratorId')
  @ApiOperation({ summary: 'Listar Feedback Pulse por colaborador' })
  @ApiResponse({ status: 200, type: [Feedback] })
  async findByCollaboratorListFeedback(
    @Param('collaboratorId') collaboratorId: string,
  ): Promise<Feedback[]> {
    return this.feedbacksService.findByCollaboratorPulse(collaboratorId);
  }
}
