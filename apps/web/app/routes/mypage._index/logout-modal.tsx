import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Modal } from "@gyeongmaetalk/ui";

import { Close } from "~/components/icons";
import { useLogout } from "~/lib/tanstack/mutation/auth";
import { useUserStore } from "~/lib/zustand/user";

interface LogoutModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function LogoutModal({ isOpen, onCancel }: LogoutModalProps) {
  const reset = useUserStore((state) => state.reset);

  const { mutate: logout, isPending } = useLogout({
    onSuccess: () => {
      reset();
      queryClient.resetQueries()
      onCancel();
    },
  });

  const [modalRef] = useOutsideClick<HTMLDivElement>(() => {
    onCancel();
  });

  return (
    isOpen && (
      <Modal ref={modalRef}>
        <Modal.Header className="flex items-center">
          <div className="flex-1" />
          <p className="flex-1">로그아웃</p>
          <div className="flex flex-1 justify-end" onClick={onCancel}>
            <Close />
          </div>
        </Modal.Header>
        <Modal.Content>정말 로그아웃 하시겠습니까?</Modal.Content>
        <Modal.Footer className="flex flex-col gap-2">
          <Button onClick={() => logout()} disabled={isPending}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
