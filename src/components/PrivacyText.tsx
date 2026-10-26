import { AGENCY, SITE } from "@/data/site";

export default function PrivacyText() {
  const who = AGENCY.name || "상담 담당"; 
  return (
    <div className="space-y-5 text-[14px] leading-[1.8] text-navy/80">
      <p>
        {who}(이하 &lsquo;회사&rsquo;)는 {SITE.name} 상담 신청을 위해 아래와 같이 개인정보를 수집·이용합니다.
      </p>
      <dl className="divide-y divide-line border-y border-line">
        {[
          ["수집 항목", "이름, 연락처, 관심타입(선택), 방문 희망 일시(관심고객 등록 시)"],
          ["수집 방법", "홈페이지 상담 신청 시 이용자 본인의 휴대전화 문자 메시지 발송"],
          ["이용 목적", "민간임대 상담 및 방문 일정 안내"],
          ["보유 기간", AGENCY.retention],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[96px_1fr] gap-4 py-3">
            <dt className="font-medium text-navy">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p>
        본 홈페이지는 입력하신 정보를 서버에 저장하지 않으며, 상담 신청 내용은 이용자의 문자 메시지 앱을 통해 상담 번호로 직접 전송됩니다.
      </p>
      <p>이용자는 개인정보 수집·이용에 동의하지 않을 권리가 있으며, 동의하지 않을 경우 문자 상담 신청이 제한됩니다. 전화 상담({SITE.tel})은 동의 없이 이용 가능합니다.</p>
    </div>
  );
}
