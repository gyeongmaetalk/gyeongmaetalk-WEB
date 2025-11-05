import Divider from "../divider";
import { Pencil } from "../icons";

interface ConsultInfoCardProps {
  purpose: string;
  area: string;
  serviceType: string;
  interest: string;
  participantType: string;
}

const getParticipantType = (purpose: string) => {
  if (purpose.includes("개인")) {
    const [_, innerOption] = purpose.split(",");
    return `개인 (${innerOption})`;
  }
  if (purpose.includes("법인")) {
    return "법인";
  }
  return "아직 정하지 못했어요";
};

const ConsultInfoCard = ({
  purpose,
  area,
  serviceType,
  interest,
  participantType,
}: ConsultInfoCardProps) => {
  return (
    <section className="space-y-4 px-4 py-6">
      <div className="flex items-center gap-1">
        <Pencil className="text-primary-normal" />
        <p className="font-headline2-bold text-label-strong">상담 정보</p>
      </div>
      <div className="space-y-3">
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">목적</p>
          <p>{purpose}</p>
        </div>
        <Divider className="bg-cool-neutral-97" />
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">지역</p>
          <p>{area}</p>
        </div>
        <Divider className="bg-cool-neutral-97" />
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">희망 서비스</p>
          <p>{serviceType}</p>
        </div>
        <Divider className="bg-cool-neutral-97" />
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">궁금한 분야</p>
          <p>{interest}</p>
        </div>
        <Divider className="bg-cool-neutral-97" />
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">명의</p>
          <p>{getParticipantType(participantType)}</p>
        </div>
      </div>
    </section>
  );
};

export default ConsultInfoCard;
