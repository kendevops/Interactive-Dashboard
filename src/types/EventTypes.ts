import { DateTime } from 'luxon';

export interface Event {
  id: number | string; // Consider string if you switch to UUIDs
  title: string;
  start: DateTime | Date; // Use Luxon DateTime or native Date depending on your handling
  end: DateTime | Date;
}