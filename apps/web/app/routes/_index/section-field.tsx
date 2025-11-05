import { useNavigate } from "react-router";

interface SectionFieldProps {
  title: string;
  children: React.ReactNode;
  viewMore?: boolean;
  viewMoreLink?: string;
}

export default function SectionField({
  title,
  children,
  viewMore,
  viewMoreLink,
}: SectionFieldProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-label-strong font-headline1-bold">{title}</div>
        <div
          className="text-label-alternative font-label1-normal-medium cursor-pointer"
          onClick={() => {
            if (viewMore) {
              navigate(viewMoreLink ?? "/");
            }
          }}
        >
          {viewMore ? "더보기" : null}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
