import type { CounselStatus } from "~/constants";

export interface MatchCounselRequest {
  purpose: string;
  area: string;
  serviceType: string;
  interest: string;
  participantType: string;
}

export interface ChangeMatchCounselRequest extends MatchCounselRequest {
  counselFormId: number;
}

export interface MatchCounselResponse {
  counselorId: number;
  counselFormId: number;
  counselorName: string;
  counselorImage: string;
  score: number;
  reviewCount: number;
  description: string;
  experience: number;
  counselCount: number;
  license: string;
  specialization: string;
}

export interface AvailableTimesRequest {
  counseldorId: number;
  date: string;
}

export interface ReserveConsultRequest {
  counseldorId: number;
  counselFormId: number;
  date: string;
}

export interface ChangeReserveConsultRequest extends ReserveConsultRequest {
  counselId: number;
}

export interface ReserveConsultResponse extends MatchCounselRequest {
  counselDate: string;
  counselTime: string;
  cellPhone: string;
}

export interface ReservedCounselDataResponse {
  status: CounselStatus;
  info: ReserveConsultResponse & MatchCounselResponse & { reviewed: boolean };
}

export interface CounselInfoResponse {
  name: string;
  experience: number;
  counselDate: string;
  counselorImage: string;
}
