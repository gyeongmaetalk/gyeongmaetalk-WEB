import Link from "next/link";

import { StoreType } from "@/constants/store";

import LinkButton from "../button/link-button";

export default function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="bg-black py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="font-title3-bold mb-8">
              지금 바로
              <br />
              경매톡과 함께하세요!
            </h1>

            <div className="mb-8 flex flex-row items-center justify-center gap-4">
              <LinkButton type={StoreType.APP_STORE} />
              <LinkButton type={StoreType.GOOGLE_PLAY} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-5 py-6">
        <div className="flex flex-col gap-4">
          <div className="font-label2-medium text-label-neutral">주식회사 데벨</div>
          <div className="flex flex-col gap-2">
            <div className="font-caption1-regular text-label-alternative">대표자명: 박승민</div>
            <div className="font-caption1-regular text-label-alternative">
              사업자등록번호: 710-86-0382
            </div>
            <div className="font-caption1-regular text-label-alternative">
              사업장 주소: 서울특별시 서초구 사임당로8길 13, 4층 402-제이79호 (서초동, 제일빌딩)
            </div>
            <div className="font-caption1-regular text-label-alternative">
              유선번호: 010-9805-8736
            </div>
          </div>
          <div className="border-cool-neutral-95 mt-2 border-t pt-4">
            <div className="mb-3 flex flex-row gap-4">
              <Link
                href="/terms-of-service"
                className="font-caption1-regular text-label-alternative hover:text-label-neutral transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/privacy-policy"
                className="font-caption1-regular text-label-alternative hover:text-label-neutral transition-colors"
              >
                개인정보 처리방침
              </Link>
            </div>
            <div className="font-caption1-regular text-label-alternative">
              © 경매톡. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
