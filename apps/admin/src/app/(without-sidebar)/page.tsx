import LoginForm from "@/components/home/login-form";

export default function LoginPage() {
  return (
    <main className="flex h-screen max-w-md flex-col justify-center">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
        <p className="text-muted-foreground mt-1 text-sm">이메일과 비밀번호를 입력하세요.</p>
      </div>
      <LoginForm />
    </main>
  );
}
