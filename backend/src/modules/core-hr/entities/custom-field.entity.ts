import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EmployeeCustomFieldValue } from './employee-custom-field-value.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('custom_field')
export class CustomField {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column({ name: 'field_name', nullable: true })
  field_name: string;

  @Column({ name: 'field_type', nullable: true })
  field_type: string;

  @Column({ name: 'is_required', default: false, nullable: true })
  isRequired: boolean;

  @OneToMany(
    () => EmployeeCustomFieldValue,
    (customFieldValue) => customFieldValue.customField,
  )
  customFieldValues?: EmployeeCustomFieldValue[];
}
