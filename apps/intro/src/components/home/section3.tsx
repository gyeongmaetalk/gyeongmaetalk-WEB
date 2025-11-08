import Image from "next/image";

const section3Icon = "/static/section3-icon.webp";

const serviceFeatureMessages = [
  "명도는 어떻게 진행하나요?",
  "전문가를 어떻게 믿을 수 있죠?",
  "수익이 날지 걱정이에요.",
  "경매 절차가 복잡하게 느껴지네요.",
];

export default function Section3() {
  return (
    <section className="bg-blue-99 py-15" aria-label="서비스 제공 가능 내용">
      <div>
        <div className="mx-auto text-center">
          <h2 className="font-title2-bold text-label-strong">복잡한 경매 절차는</h2>
          <h2 className="font-title2-bold text-primary-normal">경매톡 전문가와 함께</h2>
          <p className="font-body1-normal-regular text-label-neutral mx-auto mt-1.5">
            이런 고민, 해보신 적 있으신가요? <br />
            이제 혼자 고민하지 마세요. <br />
            경매톡의 전문가들이 도와드릴게요!
          </p>
        </div>

        {/* Service Features */}
        <div className="flex gap-2 py-8">
          {Array.from({ length: 3 }, (_, idx) => (
            <div key={`feature-slide-${idx}`} className="service-features-track-primary flex gap-2">
              {serviceFeatureMessages.map((message, idx) => (
                <div
                  key={`feature-message-${idx}`}
                  className="bg-label-strong font-body1-normal-medium rounded-full px-7 py-3 whitespace-nowrap text-white"
                >
                  {message}
                </div>
              ))}
            </div>
          ))}
          {Array.from({ length: 3 }, (_, idx) => (
            <div
              key={`feature-slide-secondary-${idx}`}
              className="service-features-track-secondary flex gap-2"
            >
              {serviceFeatureMessages.map((message, idx) => (
                <div
                  key={`feature-message-secondary-${idx}`}
                  className="bg-label-strong font-body1-normal-medium rounded-full px-7 py-3 whitespace-nowrap text-white"
                >
                  {message}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto h-[269px] w-[291px]">
        <Image fill src={section3Icon} alt="말풍선 아이콘" loading="lazy" />
      </div>
    </section>
  );
}
