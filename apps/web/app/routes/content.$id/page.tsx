import thumbnail1 from "~/assets/content-thumbnail1.png";
import thumbnail2 from "~/assets/content-thumbnail2.png";
import thumbnail3 from "~/assets/content-thumbnail3.png";
import Image from "~/components/image";
import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

interface ContentDetailPageProps {
  id: number;
}

const ContentDetailPage = ({ id }: ContentDetailPageProps) => {
  const content = contents.find((content) => content.id === id);

  if (!content) {
    return <div>콘텐츠를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <PageLayout header={<WithBackHeader onShare={() => {}} />} withFloating>
        <section className="flex flex-col gap-4 px-4 pb-12 pt-6">
          <h1 className="font-title3-bold text-label-strong whitespace-pre-line">
            {content?.title}
          </h1>
          <div className="w-full overflow-hidden rounded-[12px]">
            <Image src={content?.contentImage} alt="이미지 섬네일" />
          </div>
          <div className="font-body1-normal-regular text-label-normal">{content?.content}</div>
        </section>
      </PageLayout>
    </>
  );
};

export default ContentDetailPage;

const contents = [
  {
    id: 1,
    title: "법원에서 부동산을?\n경매, 진짜 뭔가요?",
    contentImage: thumbnail1,
    content: (
      <div>
        <h1>
          <strong>경매는 왜 법원에서 할까요?</strong>
        </h1>
        <br />
        <p>
          혹시 &apos;법원 경매&apos;라는 말을 들어보신 적 있으신가요? <br />
          왠지 어렵고, 복잡하고, 나와는 상관없는 일처럼 느껴지실 수도 있을 텐데요. 하지만 경매는{" "}
          <strong>새로운 부동산 거래 방식</strong>
          입니다.
        </p>
        <br />
        <h1>법원에서 부동산을 판다?</h1>
        <p>
          경매는 쉽게 말해, 빚을 갚지 못한 사람의 재산을 법원이 대신 팔아서 그 돈으로 빚을 갚아주는
          절차입니다. <br />
          여기서 빚을 진 사람을 &apos;채무자&apos;, 빚을 받을 사람을 &apos;채권자&apos;라고
          부릅니다. 만약 채무자가 빚을 갚지 못하면, 채권자는 법원에 경매 신청을 하게 됩니다.
        </p>
        <br />
        <p>
          그럼 법원은 이 신청을 받아들여서 채무자의 부동산을 압류하고, 가장 높은 가격을 제시하는
          사람에게 팝니다. 그렇게 해서 받은 돈으로 채권자에게 빚을 갚아주는 역할을 합니다.
        </p>
        <br />
        <h1>
          <strong>경매, 어떻게 진행되나요?</strong>
        </h1>
        <br />
        <p>경매는 총 다섯 단계로 진행됩니다. 하나씩 자세히 알아볼게요.</p>
        <br />
        <div>
          <p>
            1. 경매 신청 및 개시 결정
            <br />
            <br />
            채권자가 법원에 경매를 신청하면 법원은 경매 절차를 시작하겠다는 결정을 내립니다. 이와
            동시에 해당 부동산은 함부로 처분하지 못하도록 압류됩니다.
          </p>
          <br />
          <p>
            2. 현황 조사 및 감정 평가
            <br />
            <br />
            법원 집행관은 해당 부동산에 직접 찾아가서 현재 누가 살고 있는지, 어떤 상태인지 등을
            조사합니다. 동시에 전문가들은 이 부동산이 얼마짜리인지 공정한 가격을 정합니다. 이 가격이
            바로 경매를 시작하는 금액, 즉 &apos;최저가&apos;가 됩니다.
          </p>
          <br />
          <p>
            3. 매각 공고
            <br />
            <br />
            경매에 참여할 사람들에게 해당 부동산 정보를 알립니다. 신문, 법원 홈페이지 등에 공고하며
            이를 통해 물건의 위치, 면적, 최저가, 입찰 날짜 등을 확인할 수 있습니다.
          </p>
          <br />
          <p>
            4. 입찰과 낙찰
            <br />
            <br />
            정해진 날짜에 법원 경매 법정에서 입찰이 진행됩니다. 입찰자는 자신이 사고 싶은 금액을
            종이에 적어내고 가장 높은 금액을 쓴 사람이 경매에 성공한 사람, 즉 &apos;최고가 매수
            신고인&apos;이 됩니다. 법원은 이 금액이 적절하다고 판단하면 매각을 허가합니다.
          </p>
          <br />
          <p>
            5. 대금 납부 및 소유권 이전
            <br />
            <br />
            최고가 매수 신고인은 법원이 정한 기한 내에 잔금을 납부해야 합니다. 잔금을 모두 납부하면
            비로소 그 부동산의 소유권을 취득하게 됩니다.
          </p>
        </div>
        <br />
        <p>
          부동산 경매란 &apos;법원이 대신 물건을 팔아서 빚을 갚아주는 절차&apos;입니다. 이는
          채권자가 복잡한 추심 과정 없이 신속하게 채권을 회수할 수 있게 돕고, 동시에 채무자는 과도한
          빚의 압박에서 벗어나 재기의 발판을 마련할 기회를 얻을 수 있습니다. 또한 일반 투자자들은
          시세보다 저렴한 가격으로 부동산을 매입할 수 있는 기회를 얻게 되므로 모두에게 이로운
          해결책이 될 수 있는 제도라고 할 수 있습니다.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "경매를 위한 필수 용어를 살펴보자!",
    contentImage: thumbnail3,
    content: (
      <div>
        <p>
          경매는 낯선 용어 때문에 더 어렵게 느껴지기도 합니다. 하지만 자주 쓰이는 용어들만 알아두면
          경매 절차를 이해하는 데 큰 도움이 됩니다. 지금부터 어려웠던 필수 경매 용어들을 알기 쉽게
          정리해 드리겠습니다.
        </p>
        <br />

        <h1>
          <strong>경매 절차</strong>
        </h1>
        <br />

        <div>
          <li className="ml-5">
            <strong>경매 개시 결정</strong>
            <br />
            <p>
              법원이 채권자의 신청을 받아 경매 절차를 시작하겠다고 공식적으로 선언하는 것을
              의미합니다. 이 결정과 함께 해당 부동산은 압류됩니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>감정가</strong>
            <br />
            <p>
              감정평가사가 해당 부동산의 가치를 평가하여 정한 금액입니다. 경매 시작 가격인
              &apos;최저가&apos;의 기준이 됩니다.
            </p>
          </li>

          <br />

          <li className="ml-5">
            <strong>유찰</strong>
            <br />
            <p>
              경매 당일 입찰자가 한 명도 없거나 아무도 최저가 이상을 써내지 않아 경매가 성립되지
              않은 상태를 의미합니다. 유찰되면 보통 20~30% 낮아진 가격으로 다음 경매가 진행됩니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>입찰</strong>
            <br />
            <p>
              경매에 참여하여 사고 싶은 금액을 써내는 행위를 의미합니다. 정해진 입찰 금액을 봉투에
              넣어 제출합니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>최고가 매수 신고인</strong>
            <br />
            <p>
              경매에서 가장 높은 금액을 써내 낙찰받은 사람을 의미합니다. 최종적으로 법원의 허가를
              받으면 부동산의 주인이 됩니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>차순위 매수 신고</strong>
            <br />
            <p>
              최고가 매수 신고인이 잔금을 내지 못할 경우를 대비해, 두 번째로 높은 금액을 쓴 사람이
              매수할 기회를 갖는 것을 의미합니다. 최고가 입찰가에서 입찰 보증금을 뺀 금액보다 높은
              경우에만 가능합니다.
            </p>
          </li>
        </div>
        <br />
        <br />

        <h1>
          <strong>권리 관계 용어</strong>
        </h1>
        <br />

        <div>
          <li className="ml-5">
            <strong>채권자</strong>
            <br />
            <p>채무자에게 돈을 빌려준 사람이나 기관을 의미합니다. 경매를 신청하는 주체가 됩니다.</p>
          </li>
          <br />

          <li className="ml-5">
            <strong>채무자</strong>
            <br />
            <p>
              채권자에게 돈을 빌린 사람을 의미합니다. 빚을 갚지 못해 부동산이 경매에 넘어갑니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>임차인</strong>
            <br />
            <p>
              경매 물건을 빌려서 사용하고 있는 세입자를 의미합니다. 임대차 계약 내용을 잘 파악해야
              합니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>대항력</strong>
            <br />
            <p>
              임차인이 제3자(새로운 집주인 등)에게 자신의 임차권을 주장할 수 있는 법적 효력을
              의미합니다. 보통 전입신고와 확정일자를 갖추면 대항력이 생깁니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>근저당권</strong>
            <br />
            <p>
              돈을 빌려준 대가로 부동산을 담보로 잡는 것을 의미합니다. 경매 낙찰 시 대부분 사라지는
              권리입니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>가압류</strong>
            <br />
            <p>
              돈을 갚지 않을 것에 대비해 채무자의 재산을 임시로 묶어두는 것을 의미합니다. 역시
              경매로 소멸되는 권리입니다.
            </p>
          </li>
          <br />

          <li className="ml-5">
            <strong>명도</strong>
            <br />
            <p>
              낙찰자가 경매 부동산의 점유를 확보하는 과정을 의미합니다. 기존 거주자가 나가지 않을
              경우, 법적인 절차를 통해 강제로 내보내는 &apos;강제집행&apos;도 가능합니다.
            </p>
          </li>
        </div>
        <br />

        <p>
          경매 용어 조금은 이해가 되셨나요?
          <br />
          경매의 시작은 용어를 아는 것에서부터입니다. 하지만 복잡하고 어려운 경매 과정 때문에
          혼자서는 막막하게 느껴질 수 있습니다.
        </p>
        <br />

        <p>
          저희 경매톡은 그런 고객들이 안심하고 경매를 시작할 수 있도록 체계적인 시스템을 갖추고
          있습니다.
        </p>
        <br />

        <p>
          경매톡은 전문가가 직접 분석한 &apos;안전한 경매 물건&apos;을 추천해 드립니다. 복잡한 권리
          관계와 현장 정보를 한 눈에 파악할 수 있는 추천 매물을 통해 불필요한 위험을 피하고 경매에
          참여할 수 있습니다.
        </p>
        <br />

        <p>
          똑똑하게 내 집 마련이나 부동산 투자를 하고 싶다면, 지금 바로 경매톡을 통해 첫 경매를
          시작해 보세요! 경매톡이 당신의 첫 경매를 안전하고 성공적으로 이끌어 드리겠습니다.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: "경매는 무조건 싸게 살 수 있다?",
    contentImage: thumbnail2,
    content: (
      <div>
        <p>
          많은 사람이 경매를 &apos;싸게 부동산을 살 수 있는 방법&apos;이라고 생각합니다. 물론
          시세보다 낮은 가격에 낙찰받을 수도 있습니다. 하지만 경매는 신중하게 접근해야 합니다.
          예상치 못한 위험이 숨어 있을 수 있습니다.
        </p>
        <br />
        <div>
          <li className="list-none">
            <strong>1. 권리관계 분석의 어려움</strong>
            <br />
            부동산 등기부등본에는 여러 권리 관계(근저당, 가압류 등)가 얽혀 있습니다. 대부분은 경매로
            사라지지만, 그렇지 않은 &apos;숨어 있는 권리&apos;도 있습니다. 만약 이런 권리를 잘못
            분석하면 낙찰 후에 예상치 못한 빚을 떠안을 수 있습니다.
          </li>
          <br />

          <li className="list-none">
            <strong>2. 숨어있는 임차인</strong>
            <br />
            경매 물건에 살고 있는 임차인이 보증금을 제대로 돌려받지 못하는 경우가 있습니다. 이런
            임차인 중에는 &apos;대항력&apos;을 가진 사람이 있는데 만약 낙찰자가 이를 제대로 확인하지
            못하면 보증금을 대신 물어줘야 합니다.
          </li>
          <br />

          <li className="list-none">
            <strong>3. 명도(점유자 내보내기)의 어려움</strong>
            <br />
            경매로 낙찰받았다고 해서 바로 그 집에 들어갈 수 있는 건 아닙니다. 원래 살던 사람이나
            세입자가 순순히 나가지 않는 경우가 있습니다. 이때는 &apos;명도 소송&apos;을 진행해야
            하는데, 시간과 비용이 많이 들 수 있습니다.
          </li>
          <br />

          <li className="list-none">
            <strong>4. 정확한 시세 파악의 어려움</strong>
            <br />
            경매 물건은 급하게 팔리는 경우가 많아 정확한 시세 파악하기가 어렵습니다. 만약 시세를
            제대로 모르고 입찰했다가 너무 높은 가격에 낙찰 받으면 &apos;싸게 샀다&apos;는 의미가
            없어지겠죠.
          </li>
          <br />

          <li className="list-none">
            <strong>5. 예상치 못한 비용 발생</strong>
            <br />
            경매는 낙찰가 외에도 취득세, 명도 비용, 법무사 비용 등 여러 부대 비용이 발생합니다. 이런
            비용을 미리 계산하지 않으면 예산을 초과하는 상황이 생길 수 있습니다.
          </li>
        </div>
        <br />

        <p>
          경매는 혼자서 해결하기엔 복잡하고 어려운 과정이 많습니다. 특히 위에서 말한 위험들은
          초보자가 혼자 파악하기 매우 힘들죠.
        </p>
        <br />

        <p>
          그래서 경매톡은 전문가의 무료 상담을 제공합니다. 여러분이 안전하고 성공적인 경매 투자를 할
          수 있도록, 숨어 있는 위험을 꼼꼼히 분석하고 최적의 투자 방안을 제시해 드립니다.
        </p>
        <br />

        <p>
          경매를 통해 똑똑하게 내 집 마련이나 부동산 투자를 하고 싶다면, 경매톡에서 전문가에게
          무료로 물어보세요!
        </p>
      </div>
    ),
  },
];
