import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreatePerformanceReviewDto {
  @IsInt()
  employee_id: number;

  @IsInt()
  reviewer_id: number;

  @IsString()
  review_text: string;

  @IsNumber()
  rating: number;
}
