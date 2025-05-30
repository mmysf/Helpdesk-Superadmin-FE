import { Agent } from "../agent/types";
import { Ticket } from "../ticket/types";

import {
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
  IdName,
} from "../types";

export interface TicketComment {
  id: string;
  company: IdName & { image: string };
  product: IdName & { image: string; code: string };
  ticket: Pick<Ticket, "id" | "subject" | "content" | "priority">;
  agent: Pick<Agent, "id" | "name">;
  customer: { email: string };
  sender: string;
  content: string;
  attachments: unknown[];
  createdAt: string;
  updatedAt: string;
}

export type TicketCommentListParams = DefaultListParams & {};
export interface TicketCommentCreatePayload {
  agentId: string;
  ticketId: string;
  content: string;
  status: string;
}

export type TicketCommentListResponse = DefaultListResponse<TicketComment>;
export type TicketCommentDetailResponse = DefaultResponse<TicketComment>;
export type TicketCommentCreateResponse = DefaultResponse;
