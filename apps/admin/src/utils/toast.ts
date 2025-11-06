import { toast } from "@gyeongmaetalk/ui";

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "var(--color-green-95)",
      color: "var(--color-green-30)",
      border: "1px solid var(--color-green-90)",
    },
  });
};

export const infoToast = (message: string) => {
  toast.info(message, {
    style: {
      backgroundColor: "var(--color-blue-95)",
      color: "var(--color-blue-30)",
      border: "1px solid var(--color-blue-90)",
    },
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "var(--color-red-95)",
      color: "var(--color-red-30)",
      border: "1px solid var(--color-red-90)",
    },
  });
};
