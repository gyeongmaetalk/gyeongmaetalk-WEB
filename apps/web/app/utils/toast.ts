import { toast } from "@gyeongmaetalk/ui";

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "var(--color-toast)",
      color: "var(--color-white)",
    },
  });
};

export const infoToast = (message: string) => {
  toast.info(message, {
    style: {
      backgroundColor: "var(--color-toast)",
      color: "var(--color-white)",
    },
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "var(--color-toast)",
      color: "var(--color-white)",
    },
  });
};
