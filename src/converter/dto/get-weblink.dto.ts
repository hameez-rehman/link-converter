import { Matches } from 'class-validator';
import { deeplinkRegex } from '../constants';

export class GetWeblinkQueryDto {
  @Matches(deeplinkRegex, {})
  deeplink: string;
}
