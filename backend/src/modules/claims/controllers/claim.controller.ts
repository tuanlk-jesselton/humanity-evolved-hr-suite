import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClaimService } from '../services/claim.service';
import { CreateClaimDto } from '../dtos/create-claim.dto';

@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  create(@Body() dto: CreateClaimDto) {
    return this.claimService.create(dto);
  }

  @Get()
  findAll() {
    return this.claimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.claimService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateClaimDto>) {
    return this.claimService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.claimService.remove(id);
  }
}
