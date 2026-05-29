import { useMutation } from "@gyeongmaetalk/lib/tanstack";
import { Button, Textfield } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import { AUTH_MUTATIONS } from "~/lib/tanstack/mutation/auth";
import { useUserStore } from "~/lib/zustand/user";
import { errorToast, successToast } from "~/utils/toast";

const ReviewLoginPage = () => {
  const navigate = useNavigate();

  const { setUser, setIsRegistered, setIsLoggedIn } = useUserStore();

  const { mutate, isPending, isSuccess } = useMutation(AUTH_MUTATIONS.RequestReviewLoginCode());

  const isSubmitDisabled = isPending || isSuccess;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = e.currentTarget;
    const username = formData.username.value;
    const password = formData.password.value;

    if (!username || !password) {
      errorToast("Please fill in all fields.");
      return;
    }

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setIsLoggedIn(true);
          setIsRegistered(true);
          setUser(data.result);
          successToast("Login successful.");
          navigate("/", { replace: true });
        },
        onError: () => {
          errorToast("Failed to login.");
        },
      }
    );
  };

  return (
    <main className="flex h-full flex-col justify-center px-4">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Textfield name="username" label="Username" required placeholder="Username" />
        <Textfield
          name="password"
          label="Password"
          required
          placeholder="Password"
          type="password"
        />
        <Button disabled={isSubmitDisabled} loading={isPending}>
          Login
        </Button>
      </form>
    </main>
  );
};

export default ReviewLoginPage;
