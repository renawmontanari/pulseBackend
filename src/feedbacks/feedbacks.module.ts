import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { CollaboratorsModule } from 'src/collaborators/collaborators.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feedback } from './entities/feedback.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Feedback, Collaborator]),
    CollaboratorsModule,
  ],
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
