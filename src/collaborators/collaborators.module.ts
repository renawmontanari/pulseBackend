import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collaborator } from './entities/collaborator.entity';

@Module({
  imports: [SequelizeModule.forFeature([Collaborator])],
  providers: [CollaboratorsService],
  controllers: [CollaboratorsController],
  exports: [CollaboratorsService],
})
export class CollaboratorsModule {}
