import {
  DataAttachment,
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
  IdName,
} from "..";

export interface TicketPauseHistory {
  pausedAt: string;
  resumedAt: string;
  durationActive: number;
}

export interface TicketLogTime {
  startAt?: string;
  endAt?: string;
  durationInSeconds: number;
  pauseDurationInSeconds: number;
  status: string;
  totalDurationInSeconds: number;
  totalPauseDurationInSeconds: number;
  pauseHistory?: TicketPauseHistory[];
}

export interface TicketDetailTime {
  year: number;
  month: number;
  day: number;
  dayName: string;
}

export interface Ticket {
  id: string;
  company: IdName;
  product: IdName;
  project: IdName;
  customer: IdName & { email: string };
  agents: null;
  subject: string;
  content: string;
  code: string;
  attachments: DataAttachment[];
  logTime: TicketLogTime;
  priority: string;
  status: string;
  reminderSent: boolean;
  detailTime: TicketDetailTime;
  parent: null;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketListParams extends DefaultListParams {
  companyID?: string;
}

export interface TicketAverage {
  averageDuration: number;
  day: string;
}

export interface TicketTotalDBD {
  close: number;
  dayName: string;
  inProgress: number;
  open: number;
}

export interface TicketAssignToPayload {
  agentIds: string[];
}

export type TicketListResponse = DefaultListResponse<Ticket>;
export type TicketDetailResponse = DefaultResponse<Ticket>;
export type TicketAverageResponse = DefaultResponse<TicketAverage[]>;
export type TicketTotalDBDResponse = DefaultResponse<TicketTotalDBD[]>;
