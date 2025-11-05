import { Button, Checkbox, Label,Textarea, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { QNA } from "~/constants";
import { queryClient } from "~/lib/tanstack";
import { useRequestQna } from "~/lib/tanstack/mutation/qna";
import { infoToast, successToast } from "~/utils/toast";
import { errorToast } from "~/utils/toast";

import { type InquiryForm, inquiryFormSchema } from "./schema";

const DEFAULT_VALUES = {
  title: "",
  content: "",
  isAgree: false,
};

export default function InquiryTab() {
  const form = useForm<InquiryForm>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { mutateAsync: requestQna } = useRequestQna({
    onSuccess: () => {
      successToast("문의가 접수되었어요.");
      queryClient.invalidateQueries({ queryKey: [QNA.MY_QNA] });
      form.reset();
    },
    onError: (error) => {
      errorToast("문의 접수에 실패했어요.");
      console.error(error);
    },
  });

  const onSubmit = form.handleSubmit(async (data: InquiryForm) => {
    if (!data.title || !data.content) {
      return infoToast("모든 필수 항목을 입력해주세요.");
    }
    if (!data.isAgree) {
      return infoToast("개인정보 수집 및 이용 동의를 동의해주세요.");
    }

    await requestQna(data);
  });

  return (
    <form className="flex h-full flex-col justify-between px-4 py-6" onSubmit={onSubmit}>
      <div className="space-y-6">
        <Textfield
          {...form.register("title")}
          required
          label="문의 제목"
          placeholder="문의 제목을 입력해 주세요."
        />
        <Textarea
          {...form.register("content")}
          required
          label="문의 내용"
          placeholder="문의 사항을 입력해 주세요."
          maxLength={250}
          className="h-40"
        />
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-2">
          <Checkbox {...form.register("isAgree")} id="isAgree" />
          <Label htmlFor="isAgree" className="font-body2-normal-regular text-label-alternative">
            <p>개인정보 수집 및 이용 동의 (필수)</p>
          </Label>
        </div>
        <Button type="submit" className="self-stretch" disabled={form.formState.isSubmitting}>
          문의하기
        </Button>
      </div>
    </form>
  );
}
