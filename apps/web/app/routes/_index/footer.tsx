import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 bg-white px-5 py-6">
      <div className="font-label2-medium text-label-neutral">주식회사 데벨</div>
      <div className="flex flex-col gap-2">
        <div className="font-caption1-regular text-label-alternative">대표자명: 박승민</div>
        <div className="font-caption1-regular text-label-alternative">
          사업자등록번호: 710-86-0382
        </div>
        <div className="font-caption1-regular text-label-alternative">
          사업장 주소: 서울특별시 서초구 사임당로8길 13, 4층 402-제이79호 (서초동, 제일빌딩)
        </div>
        <div className="font-caption1-regular text-label-alternative">유선번호: 010-9805-8736</div>
        <div className="font-caption1-regular text-label-alternative">
          문의 메일:{" "}
          <a
            href="mailto:work@epqpf.com"
            className="text-label-neutral hover:text-label-strong underline transition-colors"
          >
            work@epqpf.com
          </a>
        </div>
      </div>
      <div className="border-cool-neutral-95 mt-2 border-t pt-4">
        <div className="mb-3 flex flex-row gap-4">
          <Link
            to="/terms-of-service"
            className="font-caption1-regular text-label-alternative hover:text-label-neutral transition-colors"
          >
            이용약관
          </Link>
          <Link
            to="/privacy-policy"
            className="font-caption1-regular text-label-alternative hover:text-label-neutral transition-colors"
          >
            개인정보 처리방침
          </Link>
        </div>
        <div className="font-caption1-regular text-label-alternative">
          © 경매톡. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
