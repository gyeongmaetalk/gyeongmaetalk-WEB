import { instance } from "@gyeongmaetalk/lib/ky";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { s3BaseUrl } from "~/constants";
import { api } from "~/lib/ky";
import { convertImageToWebP } from "~/utils/image";
import { errorToast } from "~/utils/toast";

export async function uploadImage(file: File, category: string) {
  const ext = file.type;
  if (!ext.includes("image")) {
    errorToast("이미지 파일만 업로드 가능해요.");
    return "";
  }

  try {
    const webpFile = await convertImageToWebP(file);

    const { result: preSignedUrl } = await api
      .get<
        BaseResponse<string>
      >("s3/presigned/put", { searchParams: { fileName: webpFile.name, category } })
      .json();

    // S3 URL을 프록시 URL로 변경
    const proxyUrl = preSignedUrl.replace(s3BaseUrl, "/api/s3");

    await instance
      .put(proxyUrl, {
        body: webpFile,
        headers: {
          "Content-Type": "image/webp",
        },
        retry: 0,
      })
      .json();

    const urlObj = new URL(preSignedUrl);
    const fileUrl = urlObj.pathname.substring(1);
    const { result: returnUrl } = await api
      .get<BaseResponse<string>>("s3/presigned/get", { searchParams: { fileUrl } })
      .json();

    return returnUrl;
  } catch (err) {
    console.error(err);
    errorToast("이미지 업로드에 실패했어요.");
    return "";
  }
}
