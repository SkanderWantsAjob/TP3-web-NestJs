import { Cv } from 'src/cv/entities/cv.entity';
import { ActionEnum } from './action.enum';
import { User } from 'src/user/entities/user.entity';

export type eventType = {
  cv: Cv;
  user: User;
  action: ActionEnum;
};