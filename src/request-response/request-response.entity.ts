import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'request_response',
})
export class RequestResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  request: string;

  @Column()
  response: string;

  constructor(requestResponse: Partial<RequestResponse>) {
    super();
    Object.assign(this, requestResponse);
  }
}
