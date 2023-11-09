import { Matches } from 'class-validator';
import { weblinkRegex } from '../constants';

export class GetDeeplinkQueryDto {
  @Matches(weblinkRegex, {
    message: 'Must be a valid URL of the service',
  })
  weblink: string;
}
