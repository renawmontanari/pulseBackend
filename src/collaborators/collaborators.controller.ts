import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from '../collaborators/dto/create-collaborator.dto';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';

@ApiTags('collaborators')
@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo colaborador Pulse' })
  @ApiResponse({
    status: 201,
    description: 'Colaborador Pulse criado com sucesso!',
    type: Collaborator,
  })
  createCollaborator(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    return this.collaboratorsService.createCollaboratorPulse(
      createCollaboratorDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os colaboradores Pulse.' })
  @ApiResponse({ status: 200, type: [Collaborator] })
  async findAllCollaborator(
    @Query('department') department?: string,
    @Query('position') position?: string,
  ): Promise<Collaborator[]> {
    return this.collaboratorsService.findAllCollaboratorPulse({
      department,
      position,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter colaborador Pulse por ID' })
  @ApiResponse({ status: 200, type: Collaborator })
  async findOneCollaborator(@Param('id') id: string): Promise<Collaborator> {
    return this.collaboratorsService.findOneCollaboratorPulse(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar colaborador Pulse' })
  @ApiResponse({ status: 200, type: Collaborator })
  async updateCollaborator(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    return this.collaboratorsService.updateCollaboratorPulse(
      id,
      updateCollaboratorDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover colaborador Pulse' })
  @ApiResponse({ status: 204 })
  async removeCollaborator(@Param('id') id: string): Promise<void> {
    return this.collaboratorsService.removeCollaboratorPulse(id);
  }

  @Get(':id/feedbacks')
  @ApiOperation({ summary: 'Listar Feedback do colaborador Pulse' })
  @ApiResponse({ status: 200, type: [Feedback] })
  async findFeedbacksCollaborator(
    @Param('id') id: string,
  ): Promise<Feedback[]> {
    return this.collaboratorsService.findFeedbacksForCollaboratorPulse(id);
  }
}
