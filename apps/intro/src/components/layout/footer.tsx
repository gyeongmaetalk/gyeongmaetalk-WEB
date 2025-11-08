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
      <div className="flex flex-col items-start bg-white px-5 pt-5 pb-[50px]">
        <p className="font-label2-medium text-label-neutral mb-2.5">경매톡</p>
        <p className="font-caption1-regular text-label-alternative mb-7.5">
          © Bid Talk. All rights reserved.
        </p>

        <p className="font-label2-medium text-label-neutral">개인정보 처리방침</p>
      </div>
    </footer>
  );
}
