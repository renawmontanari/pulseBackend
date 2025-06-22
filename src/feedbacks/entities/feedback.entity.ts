import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';

export enum FeedbackType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

@Table({ tableName: 'feedbacks', timestamps: true })
export class Feedback extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.ENUM(...Object.values(FeedbackType)),
    allowNull: false,
  })
  type: FeedbackType;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @ForeignKey(() => Collaborator)
  @Column({
    type: DataType.UUID,
    field: 'sender_id',
    allowNull: false,
  })
  senderId: string;

  @BelongsTo(() => Collaborator, 'sender_id')
  sender: Collaborator;

  @ForeignKey(() => Collaborator)
  @Column({
    type: DataType.UUID,
    field: 'receiver_id',
    allowNull: false,
  })
  receiverId: string;

  @BelongsTo(() => Collaborator, 'receiver_id')
  receiver: Collaborator;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;
}
