import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';

@Table({ tableName: 'collaborators', timestamps: true })
export class Collaborator extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  department: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @HasMany(() => Feedback)
  feedbacks: Feedback[];

  @HasMany(() => Feedback, 'sender_id')
  sentFeedbacks: Feedback[];

  @HasMany(() => Feedback, 'receiver_id')
  receivedFeedbacks: Feedback[];
}
