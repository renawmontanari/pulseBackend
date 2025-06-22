import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectModel(Collaborator)
    private collaboratorModel: typeof Collaborator,
  ) {}

  async createCollaboratorPulse(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    return this.collaboratorModel.create(createCollaboratorDto as any);
  }

  async findAllCollaboratorPulse(filters?: {
    department?: string;
    position?: string;
  }): Promise<Collaborator[]> {
    const where: any = {};
    if (filters?.department) where.department = filters.department;
    if (filters?.position) where.position = filters.position;

    return this.collaboratorModel.findAll({
      where,
      order: [['name', 'ASC']],
    });
  }

  async findOneCollaboratorPulse(id: string): Promise<Collaborator> {
    const collaborator = await this.collaboratorModel.findByPk(id, {
      include: [Feedback],
    });

    if (!collaborator) {
      throw new NotFoundException(
        `Colaborador Pulse com ID ${id} não encontrado.`,
      );
    }
    return collaborator;
  }

  async updateCollaboratorPulse(
    id: string,
    updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    const collaborator = await this.findOneCollaboratorPulse(id);
    return collaborator.update(updateCollaboratorDto);
  }

  async removeCollaboratorPulse(id: string): Promise<void> {
    const collaborator = await this.findOneCollaboratorPulse(id);
    await collaborator.destroy();
  }

  async findFeedbacksForCollaboratorPulse(id: string): Promise<Feedback[]> {
    const collaborator = await this.findOneCollaboratorPulse(id);
    return collaborator.$get('feedbacks', {
      order: [['createdAt', 'DESC']],
    }) as Promise<Feedback[]>;
  }

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    const hashedPassword = await bcrypt.hash(
      createCollaboratorDto.password,
      10,
    );

    return this.collaboratorModel.create({
      ...createCollaboratorDto,
      password: hashedPassword,
    });
  }
}
