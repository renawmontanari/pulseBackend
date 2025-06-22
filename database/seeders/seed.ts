import { Collaborator } from '../../src/collaborators/entities/collaborator.entity';
import {
  Feedback,
  FeedbackType,
} from '../../src/feedbacks/entities/feedback.entity';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../database.config';
import * as dotenv from 'dotenv';
import { CreateFeedbackDto } from '../../src/feedbacks/dto/create-feedback.dto';
import { CreateCollaboratorDto } from '../../src/collaborators/dto/create-collaborator.dto';
dotenv.config();

import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function seed() {
  const sequelize = new Sequelize(databaseConfig);
  sequelize.addModels([Collaborator, Feedback]);
  await sequelize.sync();

  const collaboratorsData: CreateCollaboratorDto[] = [
    {
      username: 'joao.silva',
      name: 'João Silva',
      password: await hashPassword('senha123'),
      position: 'Desenvolvedor Frontend',
      department: 'Tecnologia',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      username: 'maria.santos',
      name: 'Maria Santos',
      password: await hashPassword('senha123'),
      position: 'Desenvolvedora Backend',
      department: 'Tecnologia',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      username: 'pedro.oliveira',
      name: 'Pedro Oliveira',
      password: await hashPassword('senha123'),
      position: 'Product Manager',
      department: 'Produto',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      username: 'ana.costa',
      name: 'Ana Costa',
      password: await hashPassword('senha123'),
      position: 'UX Designer',
      department: 'Design',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      username: 'lucas.ferreira',
      name: 'Lucas Ferreira',
      password: await hashPassword('senha123'),
      position: 'QA Engineer',
      department: 'Qualidade',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ];

  const collaborators = await Collaborator.bulkCreate(
    collaboratorsData as any,
    {
      returning: true,
    },
  );

  const initialFeedbacksData: Partial<CreateFeedbackDto>[] = [
    {
      title: 'Ótimo trabalho no projeto X',
      description:
        'Sua contribuição foi fundamental para entregarmos o projeto no prazo.',
      type: FeedbackType.PUBLIC,
      rating: 5,
      senderId: collaborators[0].id,
      receiverId: collaborators[1].id,
    },
    {
      title: 'Melhorias na comunicação',
      description:
        'Precisamos melhorar nossa comunicação em relação aos prazos.',
      type: FeedbackType.PRIVATE,
      rating: 5,
      senderId: collaborators[1].id,
      receiverId: collaborators[0].id,
    },
    {
      title: 'Parabéns pela apresentação',
      description: 'Sua apresentação para o cliente foi excelente!',
      type: FeedbackType.PUBLIC,
      rating: 5,
      senderId: collaborators[2].id,
      receiverId: collaborators[3].id,
    },
    {
      title: 'Sugestão de melhoria',
      description:
        'Podemos otimizar o processo de design com algumas ferramentas novas.',
      type: FeedbackType.PUBLIC,
      rating: 5,
      senderId: collaborators[3].id,
      receiverId: collaborators[4].id,
    },
    {
      title: 'Feedback sobre a última sprint',
      description: 'Precisamos melhorar a qualidade dos testes automatizados.',
      type: FeedbackType.PRIVATE,
      rating: 5,
      senderId: collaborators[4].id,
      receiverId: collaborators[0].id,
    },
  ];

  await Feedback.bulkCreate(initialFeedbacksData as any);

  console.log('Gerando feedbacks em massa...');

  const feedbackTitles = [
    'Ótimo trabalho no projeto',
    'Feedback sobre a sprint',
    'Melhorias no processo',
    'Parabéns pela entrega',
    'Sugestão para o time',
    'Colaboração no projeto',
    'Desempenho na última tarefa',
    'Comunicação com o cliente',
    'Contribuição para a equipe',
    'Qualidade do código',
    'Participação na reunião',
    'Resolução do problema',
    'Implementação da feature',
    'Documentação do sistema',
    'Atendimento ao prazo',
    'Inovação no processo',
    'Ajuda aos colegas',
    'Liderança no projeto',
    'Organização das tarefas',
    'Apresentação dos resultados',
  ];

  const feedbackDescriptions = [
    'Sua contribuição foi fundamental para o sucesso do projeto.',
    'Precisamos melhorar alguns aspectos da comunicação interna.',
    'O trabalho entregue superou as expectativas do cliente.',
    'Sugiro algumas melhorias na forma como organizamos as tarefas.',
    'Sua participação nas reuniões tem sido muito produtiva.',
    'A qualidade do seu trabalho tem melhorado consistentemente.',
    'Podemos otimizar o processo para ganhar mais eficiência.',
    'Sua ajuda aos novos membros da equipe foi muito importante.',
    'A documentação que você criou facilitou muito o entendimento.',
    'Precisamos revisar a forma como estamos testando o código.',
    'Sua capacidade de resolver problemas complexos é admirável.',
    'A implementação da nova feature trouxe grande valor ao produto.',
    'Sua comunicação com o cliente tem sido excelente.',
  ];

  function generateRandomFeedback(): Partial<CreateFeedbackDto> {
    const titleIndex = Math.floor(Math.random() * feedbackTitles.length);
    const descriptionIndex = Math.floor(
      Math.random() * feedbackDescriptions.length,
    );
    const senderIndex = Math.floor(Math.random() * collaborators.length);

    let receiverIndex;
    do {
      receiverIndex = Math.floor(Math.random() * collaborators.length);
    } while (receiverIndex === senderIndex);

    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 730));

    return {
      title: `${feedbackTitles[titleIndex]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      description: `${feedbackDescriptions[descriptionIndex]} Ref: ${Math.floor(Math.random() * 10000)}`,
      type: Math.random() > 0.5 ? FeedbackType.PUBLIC : FeedbackType.PRIVATE,
      rating: Math.floor(Math.random() * 5) + 1,
      senderId: collaborators[senderIndex].id,
      receiverId: collaborators[receiverIndex].id,
      createdAt,
    };
  }

  const TOTAL_FEEDBACKS = 2000;
  const BATCH_SIZE = 500;
  let totalCreated = 0;

  for (let i = 0; i < TOTAL_FEEDBACKS; i += BATCH_SIZE) {
    const batchSize = Math.min(BATCH_SIZE, TOTAL_FEEDBACKS - i);
    const feedbackBatch: Partial<CreateFeedbackDto>[] = [];

    for (let j = 0; j < batchSize; j++) {
      feedbackBatch.push(generateRandomFeedback());
    }

    console.log(`Salvando lote de feedbacks ${i + 1} até ${i + batchSize}...`);
    await Feedback.bulkCreate(feedbackBatch as any);
    totalCreated += batchSize;
  }

  console.log(
    `Seed concluído: ${collaborators.length} colaboradores e ${totalCreated + initialFeedbacksData.length} feedbacks criados.`,
  );
  await sequelize.close();
}

seed()
  .then(() => {
    console.log('Seed executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  });
