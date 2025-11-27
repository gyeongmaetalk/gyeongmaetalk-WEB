import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { AUTH } from "~/constants/auth";
import { useUpdateUserInfo } from "~/lib/tanstack/mutation/auth";
import type { MyInfoResponse } from "~/models/auth";
import { type UpdateUserInfoForm, updateUserInfoFormSchema } from "~/routes/mypage.userinfo/schema";
import { errorToast, successToast } from "~/utils/toast";

interface UserInfoPageProps {
  myInfo: MyInfoResponse;
}

const UserInfoPage = ({ myInfo }: UserInfoPageProps) => {
  const defaultValues = {
    ...myInfo,
    birth: myInfo.birth.replace(/-/g, ""),
  };

  const { formState, watch, register, handleSubmit, setValue } = useForm<UpdateUserInfoForm>({
    resolver: zodResolver(updateUserInfoFormSchema),
    defaultValues,
  });

  const name = watch("name");
  const birth = watch("birth");
  const cellPhone = watch("cellPhone");

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>, id: keyof UpdateUserInfoForm) => {
    const value = e.target.value;

    const regex = /^\d+$/;

    // 빈 문자열이라면 공백으로 설정
    if (value.trim() === "") {
      setValue(id, "");
      return;
    }

    // 숫자가 아니라면 return
    if (!regex.test(value)) return;

    setValue(id, value);
  };

  const isOrigin =
    name === defaultValues.name &&
    birth === defaultValues.birth &&
    cellPhone === defaultValues.cellPhone;

  const isSubmitDisabled =
    !name || birth.length !== 8 || !cellPhone || formState.isSubmitting || isOrigin;

  const { mutate: updateUserInfo } = useUpdateUserInfo({
    onSuccess: () => {
      successToast("회원정보가 수정되었어요.");
      queryClient.invalidateQueries({ queryKey: [AUTH.MY_INFO] });
    },
    onError: (error) => {
      errorToast("회원정보 수정에 실패했어요.");
      console.error(error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const year = data.birth.slice(0, 4);
    const month = data.birth.slice(4, 6);
    const day = data.birth.slice(6, 8);
    const birth = `${year}-${month}-${day}`;

    updateUserInfo({
      name: data.name,
      birth,
      cellPhone: data.cellPhone,
    });
  });

  return (
    <div className="px-4 py-6">
      <form id="user-info-form" onSubmit={onSubmit} className="flex flex-col gap-5">
        <Textfield
          label="이름"
          required
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setValue("name", e.target.value)}
        />
        <Textfield
          label="생년월일"
          required
          placeholder="텍스트를 입력해주세요.(ex.19900123)"
          maxLength={8}
          value={birth}
          onChange={(e) => onChangeNumber(e, "birth")}
        />
        <Textfield
          label="전화번호"
          required
          placeholder="번호를 입력해주세요.(ex.01012345678)"
          maxLength={11}
          value={cellPhone}
          onChange={(e) => onChangeNumber(e, "cellPhone")}
        />
      </form>

      <div className="bottom-ios-bottom fixed right-0 left-0 flex flex-col gap-2 px-4 pb-6">
        <Button type="submit" disabled={isSubmitDisabled} form="user-info-form">
          수정
        </Button>
        <Button variant="text" theme="assistive">
          회원탈퇴
        </Button>
      </div>
    </div>
  );
};

export default UserInfoPage;
