export const viewTicketKeys = {
  all: ["view-ticket"] as const,
  getRemainingViewTickets: () => [...viewTicketKeys.all, "getRemainingViewTickets"] as const,
};
