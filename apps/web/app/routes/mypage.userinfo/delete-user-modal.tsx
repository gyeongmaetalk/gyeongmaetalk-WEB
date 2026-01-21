import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Modal } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import { useDeleteUser } from "~/lib/tanstack/mutation/auth";
import { useUserStore } from "~/lib/zustand/user";
import { errorToast } from "~/utils/toast";
import { successToast } from "~/utils/toast";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUserModal({ isOpen, onClose }: DeleteUserModalProps) {
  const navigate = useNavigate();
  const reset = useUserStore((state) => state.reset);

  const { mutateAsync: deleteUser, isPending: isDeleteUserPending } = useDeleteUser({
    onSuccess: () => {
      queryClient.resetQueries();
      reset();
      successToast("회원탈퇴가 완료되었어요.");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      errorToast("회원탈퇴에 실패했어요.");
      console.error(error);
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Modal className="max-w-xl">
      <Modal.Header>정말 회원탈퇴 하시겠습니까?</Modal.Header>
      <Modal.Content>
        <p>회원탈퇴 시 모든 데이터가 삭제됩니다.</p>
      </Modal.Content>
      <Modal.Footer className="flex flex-col gap-2">
        <Button
          onClick={() => deleteUser()}
          disabled={isDeleteUserPending}
          loading={isDeleteUserPending}
        >
          확인
        </Button>
        <Button variant="text" onClick={onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
