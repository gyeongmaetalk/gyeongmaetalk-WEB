import Divider from "~/components/divider";

const PrivacyPolicyPage = () => {
  return (
    <main className="flex flex-col px-4 py-6">
      <section aria-labelledby="privacy-policy-title">
        <h1 id="privacy-policy-title" className="font-body1-normal-bold mb-2">
          경매톡 개인정보 처리방침
        </h1>
        <ul
          className="font-label1-normal-regular text-label-neutral space-y-2 break-keep"
          role="list"
        >
          <li>
            &lt;데벨&gt;(&apos;gyeongmaetalk-intro.vercel.app&apos; 이하 &apos;경매톡&apos;)은(는)
            「개인정보보호법」에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한
            이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
          </li>
          <li>
            &lt;데벨&gt;(&apos;경매톡&rsquo;)은 회사가 개인정보 처리방침을 개정하는 경우, 웹사이트
            공지사항(또는 개별공지)을 통하여 공지할 것입니다.
          </li>
          <li className="font-bold">○ 본 방침은 2025년 10월 30일부터 시행됩니다.</li>
        </ul>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-purpose">
        <h2 id="privacy-purpose" className="font-body1-normal-bold mb-2">
          1. 개인정보의 처리 목적
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-2 break-keep">
          <p>
            &lt;데벨&gt;(&apos;gyeongmaetalk-intro.vercel.app&apos; 이하 &apos;경매톡&apos;)은(는)
            개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는
            사용되지 않으며 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
          </p>

          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-label1-normal-bold mb-1">가. 앱 회원가입 및 관리</dt>
              <dd>
                회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원 자격 유지·관리,
                서비스 부정이용 방지, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을
                목적으로 개인정보를 처리합니다.
              </dd>
            </div>

            <div>
              <dt className="font-label1-normal-bold mb-1">
                나. 경매지도사 매칭 및 경매 물건 대행 서비스 제공
              </dt>
              <dd>
                경매지도사와의 매칭, 경매 물건 대행 의뢰 시스템 운영, 선입금 및 유료 결제 정산, 경매
                관련 정보 및 콘텐츠 제공, 맞춤 서비스 제공 등을 목적으로 개인정보를 처리합니다.
              </dd>
            </div>

            <div>
              <dt className="font-label1-normal-bold mb-1">다. 민원사무 처리</dt>
              <dd>
                민원인의 신원 확인, 민원사항 확인, 사실 조사를 위한 연락·통지, 처리 결과 통보 등을
                목적으로 개인정보를 처리합니다.
              </dd>
            </div>

            <div>
              <dt className="font-label1-normal-bold mb-1">라. 마케팅 및 광고에의 활용</dt>
              <dd>
                신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여 기회 제공,
                인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속 빈도
                파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
              </dd>
            </div>
          </dl>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-files">
        <h2 id="privacy-files" className="font-body1-normal-bold mb-2">
          2. 개인정보 파일 현황
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-6 break-keep">
          <div>
            <dl className="space-y-1">
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">개인정보 항목</dt>
                <dd>이메일, 휴대전화번호, 로그인ID, 비밀번호, 생년월일, 이름</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">수집 방법</dt>
                <dd>모바일 앱을 통한 회원가입 시 수집</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">보유 근거</dt>
                <dd>개인 식별 및 서비스 이용 계약</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">보유 기간</dt>
                <dd>회원 탈퇴 시까지</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-label1-normal-bold mb-2">
              2. 개인정보 파일명: 서비스 이용 기록 및 결제 데이터
            </h3>
            <dl className="space-y-1">
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">개인정보 항목</dt>
                <dd>
                  서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록, 방문 일시, 단말기 정보
                  등
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">수집 방법</dt>
                <dd>서비스 이용 과정에서 자동으로 생성 및 수집</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">보유 근거</dt>
                <dd>서비스 품질 향상, 개인 맞춤형 서비스 제공 및 결제 이력 관리</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">보유 기간</dt>
                <dd>회원 탈퇴 시까지</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-label1-normal-bold mb-2">
              3. 개인정보 파일명: 맞춤형 서비스 제공 데이터
            </h3>
            <dl className="space-y-1">
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">개인정보 항목</dt>
                <dd>관심 지역, 투자 성향 및 관심도 등</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">수집 방법</dt>
                <dd>회원 동의 후 모바일 앱 입력</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">수집 목적</dt>
                <dd>개인 맞춤형 투자 정보 제공 및 경매 지도사 전달</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">보유 근거</dt>
                <dd>이용자의 선택 동의</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-label1-normal-bold min-w-[100px]">보유 기간</dt>
                <dd>회원 탈퇴 시까지 (동의 철회 시 즉시 삭제)</dd>
              </div>
            </dl>
          </div>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-retention">
        <h2 id="privacy-retention" className="font-body1-normal-bold mb-2">
          3. 개인정보의 처리 및 보유 기간
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-3 break-keep">
          <p>
            ① &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 법령에 따른 개인정보 보유·이용 기간 또는
            정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를
            처리·보유합니다.
          </p>
          <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>

          <dl className="space-y-3">
            <div>
              <ul className="ml-2 list-inside list-disc space-y-1">
                <dt className="font-label1-normal-bold">&lt;앱 회원가입 및 관리&gt;</dt>
                <li>수집 및 이용 동의일로부터 &lt;탈퇴 시까지&gt; 보유·이용</li>
                <li>보유 근거: 개인 식별 및 서비스 제공</li>
              </ul>
            </div>
            <div>
              <ul className="ml-2 list-inside list-disc space-y-1">
                <dt className="font-label1-normal-bold">&lt;민원사무 처리&gt;</dt>
                <li>수집 및 이용 동의일로부터 &lt;탈퇴 시까지&gt; 보유·이용</li>
                <li>보유 근거: 민원사무 처리</li>
              </ul>
            </div>
            <div>
              <ul className="ml-2 list-inside list-disc space-y-1">
                <dt className="font-label1-normal-bold">
                  &lt;경매 물건 대행 및 유료 서비스 제공&gt;
                </dt>
                <li>수집 및 이용 동의일로부터 &lt;탈퇴 시까지&gt; 보유·이용</li>
                <li>보유 근거: 서비스 제공 및 결제 이력 관리</li>
              </ul>
            </div>
            <div>
              <ul className="ml-2 list-inside list-disc space-y-1">
                <dt className="font-label1-normal-bold">&lt;마케팅 및 광고에의 활용&gt;</dt>
                <li>수집 및 이용 동의일로부터 &lt;탈퇴 시까지&gt; 보유·이용</li>
                <li>보유 근거: 마케팅 및 광고 활용</li>
              </ul>
            </div>
          </dl>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-third-party">
        <h2 id="privacy-third-party" className="font-body1-normal-bold mb-2">
          4. 개인정보의 제3자 제공에 관한 사항
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-3 break-keep">
          <p>
            ① &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 정보주체의 동의, 법률의 특별한 규정 등
            「개인정보보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </p>
          <p>
            ② &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 다음과 같이 개인정보를 제3자에게 제공하고
            있습니다.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-label1-normal-bold mb-2">1. 토스페이먼츠(Toss Payments)</h3>
              <dl className="ml-2 space-y-1">
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공받는 자의 개인정보 이용 목적</dt>
                  <dd>결제 승인 및 정산</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공하는 개인정보 항목</dt>
                  <dd>결제 정보(결제 금액, 결제 수단, 주문번호 등)</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공받는 자의 보유·이용 기간</dt>
                  <dd>결제 이력 관리 및 관련 법규 준수를 위한 기간</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-label1-normal-bold mb-2">2. 경매지도사</h3>
              <dl className="ml-2 space-y-1">
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공받는 자의 개인정보 이용 목적</dt>
                  <dd>경매 물건 대행 의뢰 및 컨설팅 서비스 제공</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공하는 개인정보 항목</dt>
                  <dd>이름, 연락처, 관심 물건 정보 등 (회원 동의 후)</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공받는 자의 보유·이용 기간</dt>
                  <dd>경매 대행 계약 종료 시까지</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-label1-normal-bold mb-2">3. 기타 서비스 운영을 위한 제3자</h3>
              <dl className="ml-2 space-y-1">
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">개인정보를 제공받는 자</dt>
                  <dd>문자발송 대행업체</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공받는 자의 개인정보 이용 목적</dt>
                  <dd>서비스 운영 및 관리</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공하는 개인정보 항목</dt>
                  <dd>이메일, 휴대전화번호, 이름 등 (필요한 최소한의 정보)</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="font-label1-normal-bold">제공받는 자의 보유·이용 기간</dt>
                  <dd>지체 없이 파기</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-rights">
        <h2 id="privacy-rights" className="font-body1-normal-bold mb-2">
          5. 정보주체와 법정대리인의 권리·의무 및 그 행사방법
        </h2>
        <ol
          className="font-label1-normal-regular text-label-neutral space-y-2 break-keep"
          role="list"
        >
          <li>
            ① 정보주체는 데벨에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를
            행사할 수 있습니다.
          </li>
          <li>
            ② 제1항에 따른 권리 행사는 데벨에 대해 「개인정보보호법」 시행령 제41조 제1항에 따라
            서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 데벨은(는) 이에 대해 지체 없이
            조치하겠습니다.
          </li>
          <li>
            ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여
            하실 수 있습니다. 이 경우 「개인정보보호법」 시행규칙 별지 제11호 서식에 따른 위임장을
            제출하셔야 합니다.
          </li>
          <li>
            ④ 개인정보 열람 및 처리정지 요구는 「개인정보보호법」 제35조 제5항, 제37조 제2항에
            의하여 정보주체의 권리가 제한될 수 있습니다.
          </li>
          <li>
            ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는
            경우에는 그 삭제를 요구할 수 없습니다.
          </li>
          <li>
            ⑥ 데벨은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등
            요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
          </li>
        </ol>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-items">
        <h2 id="privacy-items" className="font-body1-normal-bold mb-2">
          6. 처리하는 개인정보의 항목 작성
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-3 break-keep">
          <p>
            ① &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 다음과 같이 개인정보 항목을 처리하고 있습니다.
          </p>

          <ul className="ml-4 list-inside list-disc space-y-2" role="list">
            <li>개인 식별 정보: 이메일, 휴대전화번호, 이름, 로그인ID, 비밀번호, 성별, 생년월일</li>
            <li>
              서비스 이용 정보: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제 기록, 방문
              일시, 단말기 정보 등
            </li>
            <li>선택 정보: 관심 지역, 투자 성향 및 관심도 등</li>
            <li>결제 정보: 결제 금액, 결제 수단 등</li>
          </ul>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-destruction">
        <h2 id="privacy-destruction" className="font-body1-normal-bold mb-2">
          7. 개인정보의 파기
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-3 break-keep">
          <p>
            &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 원칙적으로 개인정보 처리 목적이 달성된 경우에는
            지체 없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
          </p>

          <ul className="list-inside list-disc space-y-3">
            <li>
              <span className="font-label1-normal-bold">파기 절차 : </span>이용자가 입력한 정보는
              목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에
              따라 일정 기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에
              의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
            </li>
            <li>
              <span className="font-label1-normal-bold">파기 기한 : </span>이용자의 개인정보는
              개인정보 보유 기간이 경과된 경우에는 보유 기간의 종료일로부터 5일 이내에, 개인정보의
              처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을
              때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를
              파기합니다.
            </li>
            <li>
              <span className="font-label1-normal-bold">파기 방법 : </span>
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에
              출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
            </li>
          </ul>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-officer">
        <h2 id="privacy-officer" className="font-body1-normal-bold mb-2">
          8. 개인정보 보호책임자
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-3 break-keep">
          <p>
            ① 데벨(&apos;경매톡&rsquo;)은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고,
            개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보
            보호책임자를 지정하고 있습니다.
          </p>

          <dl className="ml-4 space-y-2">
            <li>
              개인정보 보호 책임자
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>성명: 박승민</li>
                <li>직급: 대표</li>
                <li>연락처: work@epqpf.com</li>
              </ul>
            </li>
          </dl>

          <p className="mt-3">
            ② 정보주체께서는 데벨(&apos;경매톡&rsquo;)의 서비스(또는 사업)을 이용하시면서 발생한
            모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및
            담당부서로 문의하실 수 있습니다. 데벨(&apos;경매톡&rsquo;)은(는) 정보주체의 문의에 대해
            지체 없이 답변 및 처리해드릴 것입니다.
          </p>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-policy-changes">
        <h2 id="privacy-policy-changes" className="font-body1-normal-bold mb-2">
          9. 개인정보 처리방침 변경
        </h2>
        <div className="font-label1-normal-regular text-label-neutral break-keep">
          <p>
            ① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가,
            삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할
            것입니다.
          </p>
        </div>
        <Divider className="bg-cool-neutral-95 my-4" />
      </section>

      <section aria-labelledby="privacy-security">
        <h2 id="privacy-security" className="font-body1-normal-bold mb-2">
          10. 개인정보의 안전성 확보 조치
        </h2>
        <div className="font-label1-normal-regular text-label-neutral space-y-3 break-keep">
          <p>
            &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 「개인정보보호법」 제29조에 따라 다음과 같이
            안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
          </p>

          <ol className="list-inside list-decimal space-y-3" role="list">
            <li>
              <span className="font-label1-normal-bold">개인정보 취급 직원의 최소화 및 교육</span>
              <p className="mt-1 ml-4">
                개인정보를 취급하는 직원을 지정하고 담당자에 한정하여 최소화함으로써 개인정보를
                관리하는 대책을 시행하고 있습니다.
              </p>
            </li>
            <li>
              <span className="font-label1-normal-bold">해킹 등에 대비한 기술적 대책</span>
              <p className="mt-1 ml-4">
                &lt;데벨&gt;(&apos;경매톡&rsquo;)은(는) 해킹이나 컴퓨터 바이러스 등에 의한 개인정보
                유출 및 훼손을 막기 위하여 보안 프로그램을 설치하고 주기적인 갱신·점검을 하며
                외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고
                있습니다.
              </p>
            </li>
            <li>
              <span className="font-label1-normal-bold">개인정보에 대한 접근 제한</span>
              <p className="mt-1 ml-4">
                개인정보를 처리하는 데이터베이스 시스템에 대한 접근 권한의 부여, 변경, 말소를 통하여
                개인정보에 대한 접근 통제를 위해 필요한 조치를 하고 있으며, 침입차단시스템을
                이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
              </p>
            </li>
            <li>
              <span className="font-label1-normal-bold">비인가자에 대한 출입 통제</span>
              <p className="mt-1 ml-4">
                개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를
                수립, 운영하고 있습니다.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
