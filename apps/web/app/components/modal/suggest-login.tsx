import { Button } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import Modal from ".";

interface SuggestLoginProps {
  isOpen: boolean;
}

export default function SuggestLogin({ isOpen }: SuggestLoginProps) {
  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/login");
  };

  const onNavToHome = () => {
    navigate("/");
  };

  return (
    isOpen && (
      <Modal>
        <Modal.Header>회원가입이 필요해요!</Modal.Header>
        <Modal.Content>회원가입을 하시면 상담 신청을 완료할 수 있어요.</Modal.Content>
        <Modal.Footer className="flex flex-col gap-2">
          <Button onClick={onSignup}>회원가입하기</Button>
          <Button variant="text" onClick={onNavToHome}>
            홈으로 가기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
