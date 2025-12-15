import { Button } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import Modal from ".";

interface SuggestSignupProps {
  isOpen: boolean;
}

export default function SuggestSignup({ isOpen }: SuggestSignupProps) {
  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/signup");
  };

  return (
    isOpen && (
      <Modal>
        <Modal.Header>정보 입력이 필요해요!</Modal.Header>
        <Modal.Content>정보를 입력하시면 상담 신청을 완료할 수 있어요.</Modal.Content>
        <Modal.Footer className="flex flex-col gap-2">
          <Button onClick={onSignup}>정보 입력하기</Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
