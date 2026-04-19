/** Mixpanel 이벤트명 — 스키마·트랙 호출의 단일 소스 */
export const MIXPANEL_EVENT = {
  LANDING_VIEWED: "Landing Viewed",
  APP_DOWNLOAD_CLICKED: "App Download Clicked",
  ONBOARDING_STARTED: "Onboarding Started",
  ONBOARDING_STEPPED: "Onboarding Stepped",
  ONBOARDING_COMPLETED: "Onboarding Completed",
  LOGIN_COMPLETED: "Login Completed",
  CONSULTATION_FORM_STARTED: "Consultation Form Started",
  CONSULTATION_STEP_COMPLETED: "Consultation Step Completed",
  CONSULTATION_FORM_ABANDONED: "Consultation Form Abandoned",
  CONSULTATION_FORM_EXIT_INTENT: "Consultation Form Exit Intent",
  CONSULTATION_FORM_SUBMITTED: "Consultation Form Submitted",
  MATCHING_LOADING_VIEWED: "Matching Loading Viewed",
  MATCHING_RESULT_VIEWED: "Matching Result Viewed",
  SCHEDULE_SELECTION_VIEWED: "Schedule Selection Viewed",
  SCHEDULE_SLOT_SELECTED: "Schedule Slot Selected",
  RESERVATION_EXIT_INTENT: "Reservation Exit Intent",
  RESERVATION_COMPLETED: "Reservation Completed",
} as const;

export type MixpanelEventPropertiesMap = {
  [MIXPANEL_EVENT.LANDING_VIEWED]: LandingViewedProperties;
  [MIXPANEL_EVENT.APP_DOWNLOAD_CLICKED]: AppDownloadClickedProperties;
  [MIXPANEL_EVENT.ONBOARDING_STARTED]: OnboardingStartedProperties;
  [MIXPANEL_EVENT.ONBOARDING_STEPPED]: OnboardingSteppedProperties;
  [MIXPANEL_EVENT.ONBOARDING_COMPLETED]: OnboardingCompletedProperties;
  [MIXPANEL_EVENT.LOGIN_COMPLETED]: LoginCompletedProperties;
  [MIXPANEL_EVENT.CONSULTATION_FORM_STARTED]: ConsultationFormStartedProperties;
  [MIXPANEL_EVENT.CONSULTATION_STEP_COMPLETED]: ConsultationStepCompletedProperties;
  [MIXPANEL_EVENT.CONSULTATION_FORM_ABANDONED]: ConsultationFormAbandonedProperties;
  [MIXPANEL_EVENT.CONSULTATION_FORM_EXIT_INTENT]: ConsultationFormExitIntentProperties;
  [MIXPANEL_EVENT.CONSULTATION_FORM_SUBMITTED]: ConsultationFormSubmittedProperties;
  [MIXPANEL_EVENT.MATCHING_LOADING_VIEWED]: MatchingLoadingViewedProperties;
  [MIXPANEL_EVENT.MATCHING_RESULT_VIEWED]: MatchingResultViewedProperties;
  [MIXPANEL_EVENT.SCHEDULE_SELECTION_VIEWED]: ScheduleSelectionViewedProperties;
  [MIXPANEL_EVENT.SCHEDULE_SLOT_SELECTED]: ScheduleSlotSelectedProperties;
  [MIXPANEL_EVENT.RESERVATION_EXIT_INTENT]: ReservationExitIntentProperties;
  [MIXPANEL_EVENT.RESERVATION_COMPLETED]: ReservationCompletedProperties;
};

export type MixpanelEventName = (typeof MIXPANEL_EVENT)[keyof typeof MIXPANEL_EVENT];

interface LandingViewedProperties {
  login_check: boolean;
  platform_type: string;
  device_id?: string;
  uuid: string;
  region?: string;
}

interface AppDownloadClickedProperties {
  position: string;
  platform_type: string;
}

interface OnboardingStartedProperties {
  entry_point: string;
  auth_method?: string;
}

interface OnboardingSteppedProperties {
  step_number: number;
  step_name: string;
  time_spent_on_step: number;
}

interface OnboardingCompletedProperties {
  total_time_taken: number;
  is_first_attempt: boolean;
}

interface LoginCompletedProperties {
  auth_method: string;
  is_first_login: boolean;
  last_login_date: string;
}

interface ConsultationFormStartedProperties {
  entry_point: string;
  previous_page?: string;
}

interface ConsultationStepCompletedProperties {
  step_number: number;
  selected_option: string;
  is_input_direct: boolean;
}

interface ConsultationFormAbandonedProperties {
  last_step_number: number;
  time_spent: number;
}

/** 엑셀에 전용 프로퍼티 없음 */
type ConsultationFormExitIntentProperties = Record<string, never>;

interface ConsultationFormSubmittedProperties {
  total_time_taken: number;
  all_options_summary: string;
}

interface MatchingLoadingViewedProperties {
  /** 엑셀 샘플: 매칭 소요 시간 — ms 문자열 등 */
  matching_algorithm_version: string;
}

interface MatchingResultViewedProperties {
  expert_id: number;
  expert_name: string;
}

interface ScheduleSelectionViewedProperties {
  expert_id: number;
}

interface ScheduleSlotSelectedProperties {
  expert_id: number;
  selected_date?: string;
  selected_time?: string;
}

interface ReservationExitIntentProperties {
  trigger_point: string;
}

interface ReservationCompletedProperties {
  reservation_id: string;
  final_schedule: string;
  matching_to_reserve_duration: number;
}
