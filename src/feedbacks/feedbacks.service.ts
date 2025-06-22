import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback, FeedbackType } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { UpadateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback)
    private feedbackModel: typeof Feedback,
  ) {}

  async createFeedbackPulse(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackModel.create({
      ...createFeedbackDto,
    });
  }

  async findAllFeedbackPulse(filters?: {
    type?: FeedbackType;
    collaboratorId?: string;
  }): Promise<Feedback[]> {
    const where: any = {};
    if (filters?.type) where.type = filters.type;
    if (filters?.collaboratorId) where.collaboratorId = filters.collaboratorId;

    return this.feedbackModel.findAll({
      where,
      include: [Collaborator],
    });
  }

  async findOneFeedbackPulse(id: string): Promise<Feedback> {
    const feedback = await this.feedbackModel.findByPk(id, {
      include: [Collaborator],
    });

    if (!feedback) {
      throw new Error(`Feedback Pulse com o ID ${id} não foi encontrado.`);
    }
    return feedback;
  }

  async updateFeedbackPulse(
    id: string,
    updateFeedbackDto: UpadateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.findOneFeedbackPulse(id);
    return feedback.update(updateFeedbackDto);
  }

  async removeFeedbackPulse(id: string): Promise<void> {
    const feedback = await this.findOneFeedbackPulse(id);
    await feedback.destroy();
  }

  async findByCollaboratorPulse(collaboratorId: string): Promise<Feedback[]> {
    return this.feedbackModel.findAll({
      where: { collaboratorId },
      include: [Collaborator],
      order: [['createdAt', 'DESC']],
    });
  }
}
