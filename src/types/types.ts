export enum SeatType {
  Single = 'single',
  Double = 'double',
  Triple = 'triple'
}

export enum SeatTypeTitle {
  single = 'armchair',
  double = '2-seat sofa',
  triple = '3-seat sofa'
}

export enum Status {
  Idle = 'idle',
  Pending = 'pending',
  Complete = 'complete',
  Failed = 'failed',
}

export interface UserData {
  name: string;
  mail: string;
}

export interface ReservationData extends UserData {
  date: Date;
  seatsIds: Array<number>;
}

export interface Reservation extends ReservationData {
  id: number;
  until: string;
}

export interface DisabledProps {
  disabled: boolean;
}
