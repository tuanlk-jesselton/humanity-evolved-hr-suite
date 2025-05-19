import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimController } from './controllers/claim.controller';
import { ClaimService } from './services/claim.service';
import { Claim } from './entities/claim.entity';
import { ClaimCategory } from './entities/claim-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Claim, ClaimCategory])],
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimsModule {}
