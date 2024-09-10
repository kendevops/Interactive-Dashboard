
import { DateTime } from 'luxon';

export type Event = {
  id: number | string;
  title: string;
  start: DateTime;
  end: DateTime;
};