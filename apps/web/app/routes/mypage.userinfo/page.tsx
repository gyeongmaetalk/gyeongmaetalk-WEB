import { useEffect } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { AUTH } from "~/constants/auth";
import { useUpdateUserInfo } from "~/lib/tanstack/mutation/auth";
import { useGetMyInfo } from "~/lib/tanstack/query/auth";
import { type UpdateUserInfoForm, updateUserInfoFormSchema } from "~/routes/mypage.userinfo/schema";
import { errorToast, successToast } from "~/utils/toast";

const UserInfoPage = () => {
  const { data: myInfo } = useGetMyInfo();

  const ORIGIN_VALUES: UpdateUserInfoForm = {
    name: myInfo?.name ?? "",
    birth: formatBirthToNumber(myInfo?.birth),
    phone: myInfo?.cellPhone ?? "",
  };

  const { formState, watch, register, handleSubmit, setValue, reset } = useForm<UpdateUserInfoForm>(
    {
      resolver: zodResolver(updateUserInfoFormSchema),
      defaultValues: ORIGIN_VALUES,
    }
  );

  // myInfo가 로드되면 폼 값을 업데이트
  useEffect(() => {
    if (myInfo) {
      reset({
        name: myInfo.name,
        birth: formatBirthToNumber(myInfo.birth),
        phone: myInfo.cellPhone,
      });
    }
  }, [myInfo, reset]);

  const name = watch("name");
  const birth = watch("birth");
  const phone = watch("phone");

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

  // birth 입력 처리: 화면에는 포맷된 형태로 보여주되, 저장은 숫자만
  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 추출
    const numbers = value.replace(/\D/g, "");

    // 8자리 제한
    if (numbers.length > 8) return;

    // 숫자만 폼에 저장
    setValue("birth", numbers);
  };

  const isOrigin =
    name === myInfo?.name &&
    birth === formatBirthToNumber(myInfo?.birth) &&
    phone === myInfo?.cellPhone;

  const isSubmitDisabled = !name || !birth || !phone || formState.isSubmitting || isOrigin;

  const { mutate: updateUserInfoMutation } = useUpdateUserInfo();

  const onSubmit = handleSubmit(async (data) => {
    const year = data.birth.slice(0, 4);
    const month = data.birth.slice(4, 6);
    const day = data.birth.slice(6, 8);
    const birth = `${year}-${month}-${day}`;

    try {
      updateUserInfoMutation(
        {
          name: data.name,
          birth,
          phone: data.phone,
        },
        {
          onSuccess: () => {
            successToast("회원정보가 수정되었어요.");
            queryClient.invalidateQueries({ queryKey: [AUTH.MY_INFO] });
            reset();
          },
          onError: (error) => {
            errorToast("회원정보 수정에 실패했어요.");
            console.error(error);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="px-4 py-6">
      <form id="user-info-form" onSubmit={onSubmit} className="flex flex-col gap-5">
        <Textfield
          label="이름"
          required
          placeholder="이름을 입력해주세요"
          value={name}
          {...register("name")}
        />
        <Textfield
          label="생년월일"
          required
          placeholder="텍스트를 입력해주세요.(ex.1990-01-23)"
          maxLength={10}
          value={formatBirthToDisplay(birth)}
          onChange={onChangeBirth}
        />
        <Textfield
          label="전화번호"
          required
          placeholder="번호를 입력해주세요.(ex.01012345678)"
          maxLength={11}
          value={phone}
          onChange={(e) => onChangeNumber(e, "phone")}
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

// 날짜를 숫자로 변환: "1997-07-26" -> "19970726"
export const formatBirthToNumber = (birth: string | undefined) => {
  if (!birth) return "";
  return birth.replace(/-/g, "");
};

// 날짜를 표시 형식으로 변환: "19970726" -> "1997-07-26"
export const formatBirthToDisplay = (birth: string) => {
  if (!birth) return "";
  // 숫자만 추출
  const numbers = birth.replace(/\D/g, "");

  // 길이에 따라 포맷팅
  if (numbers.length <= 4) {
    return numbers;
  }
  if (numbers.length <= 6) {
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  }
  return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
};
