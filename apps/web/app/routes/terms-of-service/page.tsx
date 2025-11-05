import Divider from "~/components/divider";

const TermsOfServicePage = () => {
  return (
    <main className="flex flex-col px-4 py-6">
      <section>
        <h1 className="font-body1-normal-bold mb-2">제 1조 (목적)</h1>
        <div className="font-label1-normal-regular text-label-neutral">
          본 약관은 경매톡(이하 &apos;회사&lsquo;라 합니다)이 제공하는 경매지도사 매칭 서비스 및
          이에 부수하는 경매 관련 정보 제공, 경매 대행 의뢰 등 경매 관련 제반 서비스 일체(이하
          &apos;서비스&lsquo;)를 이용하는 자(이하 &apos;회원&lsquo;이라 합니다)와 회사 간의 권리,
          의무, 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>
      <section>
        <h1 className="font-body1-normal-bold mb-2">제 2조 (용어의 정의)</h1>
        <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
          <li>
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            <ol className="ml-4 list-inside list-[lower-alpha] space-y-2 break-keep">
              <li>
                &apos;회사&lsquo; 라 함은 경매톡 서비스를 운영하고 제공하는 사업자를 의미합니다.
              </li>
              <li>
                &apos;서비스&lsquo;란 회사가 모바일 어플리케이션 등을 통해 제공하는 부동산 경매정보,
                경매지도사 매칭, 경매 물건 대행 의뢰 등 경매 관련 제반 서비스를 의미합니다.
              </li>
              <li>
                &apos;회원&lsquo;이란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 고객을
                의미합니다.
              </li>
              <li>
                &apos;경매지도사&lsquo;란 회사와의 계약을 통해 회원에게 경매 컨설팅 및 대행 서비스를
                제공하는 전문가를 의미합니다.
              </li>
              <li>
                &apos;경매 물건 대행 의뢰&lsquo;란 회원이 경매지도사에게 부동산 경매 물건의 권리
                분석, 입찰 준비, 입찰 대리 등 제반 과정을 위임하는 행위를 의미합니다.
              </li>
            </ol>
          </li>
        </ol>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>
      <h1 className="font-body1-normal-bold mb-2">제 3조 (이용계약의 체결 및 적용)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>
          회원이 되고자 하는 이용자는 회사와 서비스 이용계약을 체결하여야 합니다. 서비스 이용계약은
          이용자가 본 약관에 동의하고 이용신청을 하면, 회사가 이를 승낙함으로써 성립됩니다.
        </li>
        <li>
          회사는 원칙적으로 이용자의 이용신청을 승낙합니다. 다만, 아래 각 호에 해당하는 경우에는
          승낙을 거부하거나 서비스 이용을 제한할 수 있습니다.
          <ol className="ml-4 mt-1 list-inside list-[lower-alpha] space-y-1 break-keep">
            <li>이용신청 내용에 허위 사실을 기재한 경우</li>
            <li>타인의 정보 또는 명의를 도용한 경우</li>
            <li>본 약관에서 규정한 이용 제한 사유에 해당하는 경우</li>
          </ol>
        </li>
        <li>
          회사는 회원이 본 약관 동의 및 개인정보 입력을 완료하면, 즉시 서비스를 이용할 수 있도록
          조치합니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 4조 (서비스 내용 및 정보 제공)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>
          회사는 회원에게 다음과 같은 서비스를 제공합니다.
          <ol className="ml-4 mt-1 list-inside list-[lower-alpha] space-y-1 break-keep">
            <li>부동산 경매 물건 정보 제공 (대법원 공개 자료 및 자체 가공 정보)</li>
            <li>회원과 경매지도사의 매칭 및 연결</li>
            <li>경매 물건 대행 의뢰 시스템 제공</li>
            <li>기타 경매 관련 정보 제공</li>
          </ol>
        </li>
        <li>
          회사가 제공하는 모든 경매 정보 및 부동산 정보는 참고 용도로만 사용할 수 있습니다. 회원은
          최종적인 의사 결정을 내리기 전에 정보를 직접 확인하고 검증해야 합니다.
        </li>
        <li>
          회사가 제공하는 자료를 통해 발생한 어떠한 손해에 대해서도 회사는 책임을 지지 않습니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 5조 (경매 물건 대행 의뢰 및 유료 서비스)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>
          회원은 경매지도사를 통해 경매 물건 대행을 의뢰하기 위해 회사에 300,000원의 선입금을
          납부해야 합니다.
        </li>
        <li>
          선입금은 경매지도사 매칭 및 초기 컨설팅 비용의 성격을 가지며, 회사가 경매 지도사에게 대행
          수수료를 지급하는 데 사용됩니다.
        </li>
        <li>
          회원이 경매지도사로부터 추천받은 매물에 대한 상세 정보를 열람하려면 별도의 유료 결제가
          필요할 수 있습니다. 이 경우, 결제는 토스페이먼츠(Toss Payments)를 통해 이루어집니다.
        </li>
        <li>
          회원은 선입금 후 경매지도사와의 매칭 및 의뢰가 시작된 시점부터 해당 금액에 대한 환불이
          불가함을 인지하고 동의합니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />
      <h1 className="font-body1-normal-bold mb-2">제 6조 (리뷰 작성 및 관리)</h1>

      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>회원은 첫 무료 상담(경매 컨설팅) 이후 경매지도사에 대한 리뷰를 작성할 수 있습니다.</li>
        <li>
          회사는 회원의 리뷰 내용을 바탕으로 경매지도사 및 서비스 품질 개선에 활용할 수 있습니다.
        </li>
        <li>
          회사는 허위 사실, 비방, 욕설, 개인정보 노출 등 본 약관 제 9조(회원의 의무)에 위배되는
          내용을 포함한 리뷰에 대해 사전 통지 없이 삭제하거나 임시 조치할 수 있습니다.
        </li>
        <li>
          신고 처리된 리뷰는 해당 회원이 신고 사유에 대해 이의를 제기할 수 있는 기간 동안 비공개로
          처리될 수 있습니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 7조 (회원 정보 및 통지)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>회사 정보는 회사가 운영하는 모든 서비스에 공통으로 사용됩니다.</li>
        <li>
          회사는 회원에게 이메일, 문자메시지, 푸시 알림 등을 통해 매물 정보 알림, 서비스 관련 공지
          등을 발송할 수 있습니다.
        </li>
        <li>
          회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하며, 개인정보의 보호 및 사용에
          대해서는 회사의 개인정보처리방침에 따릅니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 8조 (회사의 의무)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>회사는 본 약관 및 관계 법령을 준수하고, 안정적인 서비스를 제공하기 위해 노력합니다.</li>
        <li>
          회사는 회원의 개인정보를 보호하기 위해 보안 시스템을 구축하고 개인정보처리방침을
          준수합니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 9조 (회원의 의무)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>
          회원은 다음 행위를 하여서는 안 됩니다.
          <ol className="ml-4 mt-1 list-inside list-[lower-alpha] space-y-1 break-keep">
            <li>허위 정보를 기재하거나 타인의 정보를 도용하는 행위</li>
            <li>회사의 서비스를 부정한 방법으로 이용하거나 회사의 업무를 방해하는 행위</li>
            <li>기타 관련 법령이나 본 약관에 위배되는 행위</li>
          </ol>
        </li>
        <li>
          회원은 본인의 게정 정보를 철저히 관리해야 하며, 관리 소홀로 인해 발생하는 모든 불이익은
          회원이 부담합니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 10조 (손해배상)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>
          회사 또는 회원은 본 약관을 위반하여 상대방에게 손해를 입힌 경우에는 그 손해를 배상할
          책임이 있습니다. 다만, 고의 또는 과실이 없는 경우에는 그러하지 않습니다.
        </li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 11조 (회사의 면책)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>
          회사는 통신망 장애, 천재지변 등 불가항력적인 사유로 인해 서비스를 제공할 수 없는 경우
          책임이 면제됩니다.
        </li>
        <li>회사는 회원의 고의 또는 과실로 인한 서비스 이용의 장애에 대해 책임을 지지 않습니다.</li>
        <li>회사는 무료로 제공되는 서비스와 관련하여 발생하는 손해에 대해 책임을 지지 않습니다.</li>
      </ol>
      <Divider className="bg-cool-neutral-95 my-4" />

      <h1 className="font-body1-normal-bold mb-2">제 12조 (분쟁 해결)</h1>
      <ol className="font-label1-normal-regular text-label-neutral list-inside list-decimal space-y-2 break-keep">
        <li>본 약관의 해석 및 회원 간에 발생한 분쟁에 대해서는 대한민국의 법률을 적용합니다.</li>
        <li>
          서비스 이용과 관련하여 분쟁이 발생한 경우, 소송의 관할 법원은 민사소송법에 따릅니다.
        </li>
      </ol>

      <div className="mt-10">
        <span className="font-label1-normal-bold">&lt;부칙&gt;</span>
        <div className="font-label1-normal-regular text-label-neutral">
          공고일자: 2025년 10월 30일 <br /> 시행일자: 2025년 10월 30일
        </div>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
