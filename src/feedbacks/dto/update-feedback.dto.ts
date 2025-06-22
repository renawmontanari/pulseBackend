import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { FeedbackType } from '../entities/feedback.entity';
export class UpadateFeedbackDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ enum: FeedbackType, required: false })
  @IsEnum(FeedbackType)
  @IsOptional()
  type?: FeedbackType;

  @ApiProperty({ minimum: 1, maximum: 5, required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;
}
