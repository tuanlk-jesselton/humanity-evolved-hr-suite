
import { IsString, IsObject, IsOptional, IsEmail, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty({ description: 'Street address' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'State/Province' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ description: 'Postal code' })
  @IsString()
  @IsOptional()
  postal_code?: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  @IsOptional()
  country?: string;
}

class ContactDto {
  @ApiProperty({ description: 'Contact person name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Contact email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Contact phone number' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Legal business name', required: false })
  @IsString()
  @IsOptional()
  legal_name?: string;

  @ApiProperty({ description: 'Tax identification number', required: false })
  @IsString()
  @IsOptional()
  tax_id?: string;

  @ApiProperty({ description: 'Registration number', required: false })
  @IsString()
  @IsOptional()
  registration_number?: string;

  @ApiProperty({ description: 'Company address', type: AddressDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @ApiProperty({ description: 'Primary contact information', type: ContactDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => ContactDto)
  @IsOptional()
  primary_contact?: ContactDto;

  @ApiProperty({ description: 'Industry', required: false })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiProperty({ description: 'Company website URL', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'Company phone number', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Company email address', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Founded date in ISO format', required: false })
  @IsString()
  @IsOptional()
  founded_date?: string;

  @ApiProperty({ description: 'Fiscal year end month (1-12)', required: false })
  @IsString()
  @IsOptional()
  fiscal_year_end?: string;

  @ApiProperty({ description: 'Company logo URL', required: false })
  @IsString()
  @IsOptional()
  logo_url?: string;

  @ApiProperty({ description: 'Is the company active', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
