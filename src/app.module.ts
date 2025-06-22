import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collaborator } from './collaborators/entities/collaborator.entity';
import { Feedback } from './feedbacks/entities/feedback.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    AuthModule,
    CollaboratorsModule,
    FeedbacksModule,
    AuthModule,
    SequelizeModule.forRoot({
      models: [Collaborator, Feedback],
      autoLoadModels: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
