import { Repository } from 'typeorm';
import { RequestResponse } from './request-response.entity';
import { CustomRepository } from '../database/typeorm-ex.decorator';

@CustomRepository(RequestResponse)
export class RequestResponseRepository extends Repository<RequestResponse> {}
