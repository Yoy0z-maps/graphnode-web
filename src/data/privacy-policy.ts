export type PolicySection = {
  title: string;
  body: string;
};

export type PolicyVersion = {
  version: string;
  effectiveDate: string;
  endDate?: string;
  label: string;
  changesFrom?: string[];
  sections: PolicySection[];
};

export type PrivacyPolicyData = {
  title: string;
  intro: string;
  versions: PolicyVersion[];
};

const privacyPolicyData: Record<string, PrivacyPolicyData> = {
  ko: {
    title: "개인정보처리방침",
    intro:
      "GraphNode 운영자(이하 \"운영자\")는 정보주체의 개인정보를 중요하게 생각하며 「개인정보 보호법」 및 관계 법령을 준수합니다. 운영자는 개인정보 처리방침을 통하여 이용자의 개인정보가 어떤 목적과 방식으로 이용되고 있으며 개인정보 보호를 위해 어떠한 조치를 취하고 있는지 알려드립니다.",
    versions: [
      {
        version: "v4",
        effectiveDate: "2026-04-01",
        label: "현재 버전 (2026.04.01 ~)",
        changesFrom: [
          "운영자 체계로 전환 (회사 → 운영자)",
          "AI 서비스 제공 목적 및 그래프 노드 네트워크 기능 항목 추가",
          "외부 서비스 연동 데이터 처리 항목 신설",
          "개인정보 파기 조항(제7조) 신설",
          "개인정보 안전성 확보 조치 조항(제8조) 신설",
          "대표 정보 업데이트 (강현일, usk883135@gmail.com)",
        ],
        sections: [
          {
            title: "제1조 개인정보의 처리 목적",
            body: "운영자는 다음의 목적을 위하여 개인정보를 처리합니다.\n\n[회원 가입 및 관리]\n- 이용자 식별 및 본인 확인\n- 회원 서비스 제공\n- 계정 관리\n\n[AI 서비스 제공]\n- 사용자 입력 데이터 분석\n- AI 응답 생성\n- 대화 및 노트 데이터 처리\n\n[그래프 노드 네트워크 기능 제공]\n- 노트 및 대화 간 의미 분석\n- 노드 및 관계 그래프 생성\n- 지식 탐색 기능 제공\n\n[서비스 개선 및 안정성 확보]\n- 서비스 이용 기록 분석\n- 오류 및 장애 대응\n- 서비스 품질 개선",
          },
          {
            title: "제2조 처리하는 개인정보 항목",
            body: "운영자는 다음과 같은 개인정보를 처리할 수 있습니다.\n\n① 회원가입 시\n[필수 항목]\n- 이메일 주소\n\n② 서비스 이용 과정에서 자동으로 수집되는 정보\n- AI 대화 입력 내용\n- 노트 및 메모 내용\n- 검색어\n- 대화 세션 정보\n\n③ 자동 수집 정보\n- 접속 IP\n- 접속 로그\n- 서비스 이용 기록\n- 기기 정보\n- 쿠키\n\n④ 외부 서비스 연동 데이터\n이용자가 외부 서비스 계정을 연동하는 경우 다음 데이터가 처리될 수 있습니다.\n- 문서 데이터\n- 일정 정보\n- 검색 기록\n- 기타 연동 서비스의 데이터\n\n해당 데이터는 이용자가 요청한 기능 제공 범위 내에서만 처리됩니다.",
          },
          {
            title: "제3조 개인정보 보유 및 이용 기간",
            body: "운영자는 개인정보 처리 목적이 달성된 경우 지체 없이 해당 정보를 파기합니다.\n다만 다음과 같은 경우 일정 기간 보관할 수 있습니다.\n\n- 회원정보 → 회원 탈퇴 시까지\n- AI 대화 및 노트 데이터 → 이용자가 삭제하거나 계정을 탈퇴할 때까지\n- 서비스 로그 → 최대 1년\n\n법령에 따라 보존이 필요한 경우 해당 법령이 정한 기간 동안 보관합니다.",
          },
          {
            title: "제4조 개인정보의 제3자 제공",
            body: "운영자는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다.\n다만 다음의 경우에는 예외로 합니다.\n\n- 정보주체의 동의가 있는 경우\n- 법령에 의해 요구되는 경우",
          },
          {
            title: "제5조 개인정보 처리 위탁",
            body: "운영자는 원활한 서비스 제공을 위하여 일부 업무를 외부 업체에 위탁할 수 있습니다.\n\n- 클라우드 서비스 제공 업체\n- AI/API 서비스 제공 업체\n\n운영자는 위탁 계약 체결 시 개인정보 보호 관련 법령을 준수하도록 관리·감독합니다.",
          },
          {
            title: "제6조 정보주체의 권리",
            body: "정보주체는 언제든지 다음 권리를 행사할 수 있습니다.\n\n- 개인정보 열람\n- 개인정보 정정\n- 개인정보 삭제\n- 개인정보 처리 정지 요구\n\n권리 행사는 운영자에 요청하여 수행할 수 있습니다.",
          },
          {
            title: "제7조 개인정보 파기",
            body: "개인정보 보유기간이 경과하거나 처리 목적이 달성된 경우 해당 정보를 지체 없이 파기합니다.\n전자적 파일 형태의 정보는 복구 불가능한 방법으로 삭제하며 종이 문서는 파쇄 또는 소각합니다.",
          },
          {
            title: "제8조 개인정보 안전성 확보 조치",
            body: "운영자는 개인정보 보호를 위해 다음 조치를 시행하고 있습니다.\n\n- 개인정보 접근 권한 관리\n- 개인정보 암호화\n- 접속 기록 보관 및 관리\n- 보안 프로그램 설치",
          },
          {
            title: "제9조 대표",
            body: "운영자는 개인정보 보호를 위해 다음과 같이 개인정보 보호책임자를 지정하고 있습니다.\n\n운영자 대표\n- 성명: 강현일\n- 이메일: usk883135@gmail.com",
          },
          {
            title: "제10조 개인정보 처리방침 변경",
            body: "본 개인정보 처리방침은 법령 또는 서비스 정책 변경에 따라 수정될 수 있습니다.",
          },
        ],
      },
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        endDate: "2026-03-31",
        label: "이전 버전 (2025.03.01 ~ 2026.03.31)",
        sections: [
          {
            title: "1. 수집하는 개인정보 항목",
            body: "회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.\n\n[필수 항목]\n- Google OAuth를 통한 이메일 주소, 이름, 프로필 사진\n- 서비스 이용 기록, 접속 로그, IP 주소\n- 기기 정보 (운영체제, 앱 버전)\n\n[선택 항목]\n- 사용자가 직접 입력한 닉네임\n- 피드백 작성 시 제공한 추가 정보",
          },
          {
            title: "2. 개인정보의 수집 및 이용 목적",
            body: "회사는 수집한 개인정보를 다음의 목적에 이용합니다.\n\n- 서비스 제공 및 운영: 회원 가입, 로그인, 콘텐츠 제공, 클라우드 동기화\n- 서비스 개선: 이용 분석, 오류 수정, 새로운 기능 개발\n- 고객 지원: 문의 응답, 공지 사항 전달\n- 법적 의무 이행: 관련 법령에 따른 기록 보존",
          },
          {
            title: "3. 개인정보의 보유 및 이용 기간",
            body: "회사는 이용자의 개인정보를 서비스 이용 기간 동안 보유합니다. 회원 탈퇴 시 지체 없이 삭제하되, 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.\n\n- 전자상거래 관련 기록: 5년\n- 소비자 불만 또는 분쟁 처리 기록: 3년\n- 접속 로그 기록: 3개월",
          },
          {
            title: "4. 개인정보의 제3자 제공",
            body: "회사는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다.\n\n- 이용자가 사전에 동의한 경우\n- 법령의 규정에 따르거나 수사 기관의 요청이 있는 경우",
          },
          {
            title: "5. 개인정보 처리의 위탁",
            body: "회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.\n\n- 수탁자: Google LLC / 위탁 업무: OAuth 인증 서비스\n- 수탁자: AWS (Amazon Web Services) / 위탁 업무: 클라우드 서버 운영 및 데이터 저장",
          },
          {
            title: "6. 이용자의 권리",
            body: "이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.\n\n- 개인정보 열람 요청\n- 개인정보 정정·삭제 요청\n- 개인정보 처리 정지 요청\n- 동의 철회\n\n권리 행사는 앱 내 계정 설정 또는 고객센터를 통해 가능합니다.",
          },
          {
            title: "7. 개인정보 보호책임자",
            body: "회사는 개인정보 처리에 관한 업무를 총괄하는 개인정보 보호책임자를 지정합니다.\n\n- 성명: 한요한\n- 이메일: privacy@graphnode.app\n- 문의 처리 시간: 평일 09:00 ~ 18:00 (공휴일 제외)",
          },
          {
            title: "8. 개인정보처리방침 변경",
            body: "본 개인정보처리방침은 법령·정책의 변경이나 서비스의 변화에 따라 개정될 수 있습니다. 변경 시 최소 7일 전에 앱 또는 웹사이트를 통해 공지합니다.",
          },
        ],
      },
      {
        version: "v2",
        effectiveDate: "2024-09-01",
        endDate: "2025-02-28",
        label: "v2 · 2024년 9월 1일",
        changesFrom: [
          "기기 정보(OS, 앱 버전) 수집 항목 추가",
          "개인정보 처리 위탁 조항(제5조) 신설 — AWS 클라우드 위탁 내용 포함",
          "이용자 권리 조항(제6조) 신설 — 열람·정정·삭제·처리정지 권리 명시",
          "개인정보 보호책임자 연락처 및 처리 시간 상세화",
        ],
        sections: [
          {
            title: "1. 수집하는 개인정보 항목",
            body: "회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.\n\n[필수 항목]\n- Google OAuth를 통한 이메일 주소, 이름\n- 서비스 이용 기록, 접속 로그, IP 주소\n- 기기 정보 (운영체제, 앱 버전)\n\n[선택 항목]\n- 사용자가 직접 입력한 닉네임",
          },
          {
            title: "2. 개인정보의 수집 및 이용 목적",
            body: "회사는 수집한 개인정보를 다음의 목적에 이용합니다.\n\n- 서비스 제공 및 운영: 회원 가입, 로그인, 콘텐츠 제공\n- 서비스 개선: 이용 분석, 오류 수정, 신규 기능 개발\n- 고객 지원: 문의 응답, 공지 사항 전달",
          },
          {
            title: "3. 개인정보의 보유 및 이용 기간",
            body: "회사는 이용자의 개인정보를 서비스 이용 기간 동안 보유합니다. 회원 탈퇴 시 지체 없이 삭제하되, 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.\n\n- 전자상거래 관련 기록: 5년\n- 소비자 불만 또는 분쟁 처리 기록: 3년\n- 접속 로그 기록: 3개월",
          },
          {
            title: "4. 개인정보의 제3자 제공",
            body: "회사는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다.\n\n- 이용자가 사전에 동의한 경우\n- 법령의 규정에 따르거나 수사 기관의 요청이 있는 경우",
          },
          {
            title: "5. 개인정보 처리의 위탁",
            body: "회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.\n\n- 수탁자: Google LLC / 위탁 업무: OAuth 인증 서비스\n- 수탁자: AWS (Amazon Web Services) / 위탁 업무: 클라우드 서버 운영 및 데이터 저장",
          },
          {
            title: "6. 이용자의 권리",
            body: "이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.\n\n- 개인정보 열람 요청\n- 개인정보 정정·삭제 요청\n- 개인정보 처리 정지 요청\n- 동의 철회\n\n권리 행사는 앱 내 계정 설정 또는 고객센터(privacy@graphnode.app)를 통해 가능합니다.",
          },
          {
            title: "7. 개인정보 보호책임자",
            body: "회사는 개인정보 처리에 관한 업무를 종괄하는 개인정보 보호책임자를 지정합니다.\n\n- 성명: 한요한\n- 이메일: privacy@graphnode.app\n- 문의 처리 시간: 평일 09:00 ~ 18:00 (공휴일 제외)",
          },
          {
            title: "8. 개인정보처리방침 변경",
            body: "본 개인정보처리방침은 법령·정책의 변경이나 서비스의 변화에 따라 개정될 수 있습니다. 변경 시 최소 7일 전에 앱 또는 웹사이트를 통해 공지합니다.",
          },
        ],
      },
      {
        version: "v1",
        effectiveDate: "2024-03-01",
        endDate: "2024-08-31",
        label: "v1 · 2024년 3월 1일",
        changesFrom: [
          "서비스 최초 출시에 따른 개인정보처리방침 최초 제정",
          "Google OAuth 기반 이메일·이름만 수집 (기기 정보 미수집)",
          "이용자 권리 조항 및 처리 위탁 조항 미포함",
        ],
        sections: [
          {
            title: "1. 수집하는 개인정보 항목",
            body: "회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.\n\n[필수 항목]\n- Google OAuth를 통한 이메일 주소, 이름\n- 서비스 이용 기록, 접속 로그\n\n본 서비스는 베타 운영 단계로, 최소한의 정보만 수집합니다.",
          },
          {
            title: "2. 개인정보의 수집 및 이용 목적",
            body: "수집된 개인정보는 아래 목적에 한하여 이용됩니다.\n\n- 서비스 로그인 및 회원 관리\n- 서비스 이용 현황 파악 및 오류 개선",
          },
          {
            title: "3. 개인정보의 보유 및 이용 기간",
            body: "이용자의 개인정보는 서비스 이용 기간 동안 보유하며, 회원 탈퇴 시 즉시 삭제합니다.",
          },
          {
            title: "4. 개인정보의 제3자 제공",
            body: "회사는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다.",
          },
          {
            title: "5. 개인정보 보호책임자",
            body: "개인정보 처리와 관련한 문의는 아래로 연락하여 주십시오.\n\n- 이메일: privacy@graphnode.app",
          },
        ],
      },
    ],
  },

  en: {
    title: "Privacy Policy",
    intro:
      "GraphNode operator (hereinafter \"Operator\") values your personal information and complies with applicable privacy laws and regulations. This Privacy Policy explains how your personal information is used and what measures are taken to protect it.",
    versions: [
      {
        version: "v4",
        effectiveDate: "2026-04-01",
        label: "Current Version (Effective April 1, 2026)",
        changesFrom: [
          "Transitioned to Operator framework (Company → Operator)",
          "Added AI service provision and graph node network feature purposes",
          "Added external service integration data processing section",
          "Added data destruction clause (Article 7)",
          "Added data security measures clause (Article 8)",
          "Updated representative information (Hyunil Kang, usk883135@gmail.com)",
        ],
        sections: [
          {
            title: "Article 1: Purpose of Processing Personal Information",
            body: "The Operator processes personal information for the following purposes.\n\n[Member Registration and Management]\n- User identification and verification\n- Member service provision\n- Account management\n\n[AI Service Provision]\n- User input data analysis\n- AI response generation\n- Conversation and note data processing\n\n[Graph Node Network Features]\n- Semantic analysis between notes and conversations\n- Node and relationship graph generation\n- Knowledge exploration features\n\n[Service Improvement and Stability]\n- Service usage log analysis\n- Error and failure response\n- Service quality improvement",
          },
          {
            title: "Article 2: Personal Information Collected",
            body: "The Operator may process the following personal information.\n\n① Upon registration\n[Required]\n- Email address\n\n② Automatically collected during service use\n- AI conversation input\n- Notes and memo content\n- Search queries\n- Conversation session information\n\n③ Automatically generated information\n- Access IP\n- Access logs\n- Service usage records\n- Device information\n- Cookies\n\n④ External service integration data\nIf a user connects external service accounts, the following data may be processed:\n- Document data\n- Calendar information\n- Search history\n- Other data from integrated services\n\nSuch data is processed only within the scope of features requested by the user.",
          },
          {
            title: "Article 3: Retention Period",
            body: "The Operator destroys personal information without delay once the processing purpose has been achieved.\nHowever, information may be retained for certain periods in the following cases:\n\n- Member information → Until account withdrawal\n- AI conversation and note data → Until deleted by the user or account withdrawal\n- Service logs → Up to 1 year\n\nIf retention is required by law, information is retained for the period specified by that law.",
          },
          {
            title: "Article 4: Sharing with Third Parties",
            body: "The Operator does not provide personal information to third parties in principle.\nExceptions include:\n\n- When the data subject has given consent\n- When required by law",
          },
          {
            title: "Article 5: Outsourcing of Processing",
            body: "The Operator may outsource some operations to external companies for smooth service provision.\n\n- Cloud service providers\n- AI/API service providers\n\nThe Operator supervises outsourced parties to ensure compliance with personal information protection laws.",
          },
          {
            title: "Article 6: Rights of Data Subjects",
            body: "Data subjects may exercise the following rights at any time:\n\n- Access personal information\n- Correct personal information\n- Delete personal information\n- Request suspension of processing\n\nRights can be exercised by contacting the Operator.",
          },
          {
            title: "Article 7: Destruction of Personal Information",
            body: "Personal information is destroyed without delay once the retention period has expired or the processing purpose has been achieved.\nElectronic files are deleted using methods that prevent recovery, and paper documents are shredded or incinerated.",
          },
          {
            title: "Article 8: Security Measures",
            body: "The Operator implements the following measures to protect personal information:\n\n- Access control management\n- Encryption of personal information\n- Access log retention and management\n- Security software installation",
          },
          {
            title: "Article 9: Representative",
            body: "The Operator has designated a personal information protection officer as follows:\n\nOperator Representative\n- Name: Hyunil Kang\n- Email: usk883135@gmail.com",
          },
          {
            title: "Article 10: Policy Changes",
            body: "This Privacy Policy may be revised in accordance with changes in laws or service policies.",
          },
        ],
      },
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        endDate: "2026-03-31",
        label: "Previous Version (Mar 1, 2025 – Mar 31, 2026)",
        sections: [
          {
            title: "1. Personal Information We Collect",
            body: "The Company collects the following personal information to provide its services.\n\n[Required]\n- Email address, name, and profile picture via Google OAuth\n- Service usage logs, access logs, IP address\n- Device information (OS, app version)\n\n[Optional]\n- Nickname entered by the user\n- Additional information provided in feedback",
          },
          {
            title: "2. Purpose of Collection and Use",
            body: "The Company uses collected personal information for the following purposes:\n\n- Service provision and operation: registration, login, content delivery, cloud sync\n- Service improvement: usage analysis, bug fixes, new feature development\n- Customer support: responding to inquiries, delivering notices\n- Legal compliance: record retention as required by law",
          },
          {
            title: "3. Retention Period",
            body: "The Company retains personal information for the duration of service use. Upon account deletion, information is promptly removed, except where retention is required by law.\n\n- E-commerce records: 5 years\n- Consumer complaints and dispute records: 3 years\n- Access logs: 3 months",
          },
          {
            title: "4. Sharing with Third Parties",
            body: "The Company does not share personal information with third parties without prior user consent, except in the following cases:\n\n- When the user has given prior consent\n- When required by law or requested by investigative authorities",
          },
          {
            title: "5. Outsourcing of Processing",
            body: "The Company entrusts personal information processing as follows for smooth service operation:\n\n- Trustee: Google LLC / Task: OAuth authentication\n- Trustee: AWS (Amazon Web Services) / Task: Cloud server operation and data storage",
          },
          {
            title: "6. User Rights",
            body: "Users may exercise the following rights at any time:\n\n- Request to access personal information\n- Request to correct or delete personal information\n- Request to suspend processing of personal information\n- Withdraw consent\n\nRights can be exercised through in-app account settings or customer support.",
          },
          {
            title: "7. Privacy Officer",
            body: "The Company designates a Privacy Officer responsible for overseeing personal information handling.\n\n- Name: Yohan Han\n- Email: privacy@graphnode.app\n- Hours: Weekdays 09:00 – 18:00 (excluding holidays)",
          },
          {
            title: "8. Policy Changes",
            body: "This Privacy Policy may be revised due to changes in laws, policies, or services. We will notify users at least 7 days in advance via the app or website.",
          },
        ],
      },
      {
        version: "v2",
        effectiveDate: "2024-09-01",
        label: "Previous Version (Sep 1, 2024 – Feb 28, 2025)",
        sections: [
          {
            title: "1. Personal Information We Collect",
            body: "[Required]\n- Email address and name via Google OAuth\n- Service usage logs, access logs\n\n[Optional]\n- Nickname entered by the user",
          },
          {
            title: "2. Purpose of Collection and Use",
            body: "- Service provision: registration, login, content delivery\n- Service improvement: usage analysis, bug fixes\n- Customer support: responding to inquiries",
          },
          {
            title: "3. Retention Period",
            body: "Information is retained during the service period and deleted promptly upon account deletion.\n\n- E-commerce records: 5 years\n- Consumer complaints: 3 years",
          },
          {
            title: "4. Sharing with Third Parties",
            body: "The Company does not share personal information with third parties without prior consent.",
          },
          {
            title: "5. Privacy Officer",
            body: "- Name: Yohan Han\n- Email: privacy@graphnode.app",
          },
        ],
      },
      {
        version: "v1",
        effectiveDate: "2024-03-01",
        label: "Initial Version (Mar 1, 2024 – Aug 31, 2024)",
        sections: [
          {
            title: "1. Personal Information We Collect",
            body: "The Company collects email address and name via Google OAuth.",
          },
          {
            title: "2. Purpose of Collection and Use",
            body: "Collected data is used solely for login and account management.",
          },
          {
            title: "3. Retention Period",
            body: "Data is deleted immediately upon account deletion.",
          },
          {
            title: "4. Privacy Officer",
            body: "Email: privacy@graphnode.app",
          },
        ],
      },
    ],
  },

  zh: {
    title: "隐私政策",
    intro:
      "GraphNode 运营者（以下简称「运营者」）重视个人信息主体的个人信息，遵守《个人信息保护法》及相关法律法规。运营者通过本个人信息处理方针，告知用户其个人信息的使用目的、方式及为保护个人信息所采取的措施。",
    versions: [
      {
        version: "v4",
        effectiveDate: "2026-04-01",
        label: "当前版本（自2026年4月1日起生效）",
        changesFrom: [
          "转换为运营者体系（公司 → 运营者）",
          "新增AI服务提供目的及图谱节点网络功能项目",
          "新增外部服务联动数据处理条款",
          "新增个人信息销毁条款（第7条）",
          "新增个人信息安全保护措施条款（第8条）",
          "更新代表信息（강현일，usk883135@gmail.com）",
        ],
        sections: [
          {
            title: "第1条 个人信息的处理目的",
            body: "运营者为以下目的处理个人信息。\n\n【会员注册及管理】\n- 用户识别及本人确认\n- 会员服务提供\n- 账户管理\n\n【AI服务提供】\n- 用户输入数据分析\n- AI响应生成\n- 对话及笔记数据处理\n\n【图谱节点网络功能提供】\n- 笔记及对话间语义分析\n- 节点及关系图谱生成\n- 知识探索功能提供\n\n【服务改善及稳定性保障】\n- 服务使用记录分析\n- 错误及故障处理\n- 服务质量改善",
          },
          {
            title: "第2条 处理的个人信息项目",
            body: "运营者可处理以下个人信息。\n\n① 会员注册时\n【必填项】\n- 电子邮件地址\n\n② 服务使用过程中自动收集的信息\n- AI对话输入内容\n- 笔记及备忘录内容\n- 搜索词\n- 对话会话信息\n\n③ 自动收集信息\n- 访问IP\n- 访问日志\n- 服务使用记录\n- 设备信息\n- Cookie\n\n④ 外部服务联动数据\n用户关联外部服务账户时，以下数据可能被处理：\n- 文档数据\n- 日程信息\n- 搜索历史\n- 其他联动服务的数据\n\n相关数据仅在用户请求的功能提供范围内进行处理。",
          },
          {
            title: "第3条 个人信息保留及使用期限",
            body: "个人信息处理目的达成后，运营者将立即销毁相关信息。\n但以下情况可保留一定期限：\n\n- 会员信息 → 至会员注销为止\n- AI对话及笔记数据 → 至用户删除或注销账户为止\n- 服务日志 → 最长1年\n\n法律要求保留时，按相关法律规定的期限保管。",
          },
          {
            title: "第4条 个人信息的第三方提供",
            body: "运营者原则上不向第三方提供个人信息主体的个人信息。\n但以下情况除外：\n\n- 个人信息主体同意的情况\n- 法律要求的情况",
          },
          {
            title: "第5条 个人信息处理委托",
            body: "运营者为顺利提供服务，可将部分业务委托给外部公司。\n\n- 云服务提供商\n- AI/API服务提供商\n\n运营者在签订委托合同时，对受托方遵守个人信息保护相关法律进行管理监督。",
          },
          {
            title: "第6条 信息主体的权利",
            body: "信息主体可随时行使以下权利：\n\n- 查阅个人信息\n- 更正个人信息\n- 删除个人信息\n- 要求停止处理个人信息\n\n可向运营者请求行使上述权利。",
          },
          {
            title: "第7条 个人信息销毁",
            body: "个人信息保留期限届满或处理目的达成后，立即销毁相关信息。\n电子文件以无法恢复的方式删除，纸质文件予以粉碎或焚毁。",
          },
          {
            title: "第8条 个人信息安全保护措施",
            body: "运营者为保护个人信息实施以下措施：\n\n- 个人信息访问权限管理\n- 个人信息加密\n- 访问记录保管及管理\n- 安全程序安装",
          },
          {
            title: "第9条 代表",
            body: "运营者已指定个人信息保护负责人如下：\n\n运营者代表\n- 姓名：강현일\n- 电子邮件：usk883135@gmail.com",
          },
          {
            title: "第10条 个人信息处理方针变更",
            body: "本个人信息处理方针可能因法律或服务政策变更而修订。",
          },
        ],
      },
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        endDate: "2026-03-31",
        label: "旧版本（2025年3月1日 – 2026年3月31日）",
        sections: [
          {
            title: "一、收集的个人信息",
            body: "公司为提供服务收集以下个人信息。\n\n【必填项】\n- 通过Google OAuth获取的电子邮件地址、姓名及头像\n- 服务使用记录、访问日志、IP地址\n- 设备信息（操作系统、应用版本）\n\n【选填项】\n- 用户自行输入的昵称\n- 提交反馈时提供的附加信息",
          },
          {
            title: "二、个人信息的收集及使用目的",
            body: "公司将收集到的个人信息用于以下目的：\n\n- 服务提供与运营：注册、登录、内容提供、云端同步\n- 服务改善：使用分析、错误修复、新功能开发\n- 客户支持：回复咨询、发送通知\n- 履行法律义务：依据相关法规保存记录",
          },
          {
            title: "三、个人信息的保留期限",
            body: "公司在服务使用期间保留个人信息。注销账户时将立即删除，但法律要求保留的除外。\n\n- 电子商务相关记录：5年\n- 消费者投诉或纠纷处理记录：3年\n- 访问日志：3个月",
          },
          {
            title: "四、向第三方提供个人信息",
            body: "未经用户事先同意，公司不向第三方提供个人信息，以下情况除外：\n\n- 用户已事先同意\n- 依据法律规定或执法机关要求",
          },
          {
            title: "五、个人信息处理委托",
            body: "为顺利提供服务，公司将个人信息处理业务委托如下：\n\n- 受托方：Google LLC / 委托业务：OAuth认证服务\n- 受托方：AWS（亚马逊云服务）/ 委托业务：云服务器运营及数据存储",
          },
          {
            title: "六、用户权利",
            body: "用户可随时行使以下权利：\n\n- 请求查阅个人信息\n- 请求更正或删除个人信息\n- 请求停止处理个人信息\n- 撤回同意\n\n可通过应用内账户设置或客服渠道行使上述权利。",
          },
          {
            title: "七、隐私保护负责人",
            body: "公司指定隐私保护负责人，统筹管理个人信息处理事务。\n\n- 姓名：韩要汉\n- 电子邮件：privacy@graphnode.app\n- 受理时间：工作日 09:00–18:00（节假日除外）",
          },
          {
            title: "八、隐私政策变更",
            body: "本隐私政策可能因法律、政策变化或服务调整而修订。变更时将至少提前7天通过应用或网站通知用户。",
          },
        ],
      },
      {
        version: "v2",
        effectiveDate: "2024-09-01",
        label: "旧版本（2024年9月1日 – 2025年2月28日）",
        sections: [
          {
            title: "一、收集的个人信息",
            body: "【必填项】\n- 通过Google OAuth获取的电子邮件地址、姓名\n- 服务使用记录、访问日志\n\n【选填项】\n- 用户自行输入的昵称",
          },
          {
            title: "二、使用目的",
            body: "- 服务提供：注册、登录、内容提供\n- 服务改善：使用分析、错误修复\n- 客户支持：回复咨询",
          },
          {
            title: "三、保留期限",
            body: "在服务使用期间保留，注销账户后立即删除。\n\n- 电子商务记录：5年\n- 消费者投诉记录：3年",
          },
          {
            title: "四、向第三方提供",
            body: "未经用户事先同意，不向第三方提供个人信息。",
          },
          {
            title: "五、隐私保护负责人",
            body: "- 姓名：韩要汉\n- 电子邮件：privacy@graphnode.app",
          },
        ],
      },
      {
        version: "v1",
        effectiveDate: "2024-03-01",
        label: "初始版本（2024年3月1日 – 2024年8月31日）",
        sections: [
          {
            title: "一、收集的个人信息",
            body: "公司通过Google OAuth收集电子邮件地址和姓名。",
          },
          {
            title: "二、使用目的",
            body: "收集的数据仅用于登录和账户管理。",
          },
          {
            title: "三、保留期限",
            body: "注销账户后立即删除。",
          },
          {
            title: "四、隐私保护负责人",
            body: "电子邮件：privacy@graphnode.app",
          },
        ],
      },
    ],
  },

  ja: {
    title: "プライバシーポリシー",
    intro:
      "GraphNode 運営者（以下「運営者」）は、情報主体の個人情報を重視し、「個人情報保護法」および関連法令を遵守します。運営者は本個人情報処理方針を通じて、ユーザーの個人情報がどのような目的・方法で利用され、個人情報保護のためにどのような措置を講じているかをお知らせします。",
    versions: [
      {
        version: "v4",
        effectiveDate: "2026-04-01",
        label: "現行バージョン（2026年4月1日より適用）",
        changesFrom: [
          "運営者体制へ移行（会社 → 運営者）",
          "AIサービス提供目的およびグラフノードネットワーク機能項目を追加",
          "外部サービス連携データ処理条項を新設",
          "個人情報破棄条項（第7条）を新設",
          "個人情報安全性確保措置条項（第8条）を新設",
          "代表者情報を更新（강현일、usk883135@gmail.com）",
        ],
        sections: [
          {
            title: "第1条 個人情報の処理目的",
            body: "運営者は以下の目的で個人情報を処理します。\n\n【会員登録および管理】\n- ユーザー識別および本人確認\n- 会員サービスの提供\n- アカウント管理\n\n【AIサービスの提供】\n- ユーザー入力データの分析\n- AI応答の生成\n- 会話およびノートデータの処理\n\n【グラフノードネットワーク機能の提供】\n- ノートおよび会話間の意味分析\n- ノードおよび関係グラフの生成\n- 知識探索機能の提供\n\n【サービス改善および安定性確保】\n- サービス利用記録の分析\n- エラーおよび障害への対応\n- サービス品質の改善",
          },
          {
            title: "第2条 処理する個人情報の項目",
            body: "運営者は以下の個人情報を処理することがあります。\n\n① 会員登録時\n【必須項目】\n- メールアドレス\n\n② サービス利用過程で自動収集される情報\n- AI会話の入力内容\n- ノートおよびメモの内容\n- 検索ワード\n- 会話セッション情報\n\n③ 自動収集情報\n- アクセスIP\n- アクセスログ\n- サービス利用記録\n- デバイス情報\n- Cookie\n\n④ 外部サービス連携データ\nユーザーが外部サービスアカウントを連携する場合、以下のデータが処理されることがあります。\n- ドキュメントデータ\n- スケジュール情報\n- 検索履歴\n- その他連携サービスのデータ\n\n当該データはユーザーが要請した機能の提供範囲内でのみ処理されます。",
          },
          {
            title: "第3条 個人情報の保有・利用期間",
            body: "個人情報の処理目的が達成された場合、運営者は速やかに当該情報を破棄します。\nただし、以下の場合は一定期間保管することがあります。\n\n- 会員情報 → 退会時まで\n- AI会話およびノートデータ → ユーザーが削除または退会するまで\n- サービスログ → 最大1年\n\n法令により保存が必要な場合は、当該法令が定める期間保管します。",
          },
          {
            title: "第4条 個人情報の第三者提供",
            body: "運営者は原則として情報主体の個人情報を第三者に提供しません。\nただし、以下の場合は例外とします。\n\n- 情報主体の同意がある場合\n- 法令により要求される場合",
          },
          {
            title: "第5条 個人情報処理の委託",
            body: "運営者は円滑なサービス提供のため、一部業務を外部業者に委託することがあります。\n\n- クラウドサービス提供業者\n- AI/APIサービス提供業者\n\n運営者は委託契約締結時に個人情報保護関連法令を遵守するよう管理・監督します。",
          },
          {
            title: "第6条 情報主体の権利",
            body: "情報主体はいつでも以下の権利を行使できます。\n\n- 個人情報の閲覧\n- 個人情報の訂正\n- 個人情報の削除\n- 個人情報処理の停止要求\n\n権利の行使は運営者に請求することで行えます。",
          },
          {
            title: "第7条 個人情報の破棄",
            body: "個人情報の保有期間が経過または処理目的が達成された場合、当該情報を速やかに破棄します。\n電子ファイル形式の情報は復元不可能な方法で削除し、紙文書はシュレッダーにかけるか焼却します。",
          },
          {
            title: "第8条 個人情報の安全性確保措置",
            body: "運営者は個人情報保護のために以下の措置を実施しています。\n\n- 個人情報へのアクセス権限管理\n- 個人情報の暗号化\n- アクセス記録の保管および管理\n- セキュリティプログラムのインストール",
          },
          {
            title: "第9条 代表者",
            body: "運営者は個人情報保護のために以下のとおり個人情報保護責任者を指定しています。\n\n運営者代表\n- 氏名：강현일\n- メール：usk883135@gmail.com",
          },
          {
            title: "第10条 個人情報処理方針の変更",
            body: "本個人情報処理方針は法令またはサービスポリシーの変更に伴い修正されることがあります。",
          },
        ],
      },
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        endDate: "2026-03-31",
        label: "旧バージョン（2025年3月1日 ～ 2026年3月31日）",
        sections: [
          {
            title: "1. 収集する個人情報",
            body: "当社はサービス提供のために以下の個人情報を収集します。\n\n【必須項目】\n- Google OAuthによるメールアドレス、氏名、プロフィール画像\n- サービス利用履歴、アクセスログ、IPアドレス\n- デバイス情報（OS、アプリバージョン）\n\n【任意項目】\n- ユーザーが入力したニックネーム\n- フィードバック送信時に提供した追加情報",
          },
          {
            title: "2. 個人情報の収集・利用目的",
            body: "当社は収集した個人情報を以下の目的で利用します。\n\n- サービス提供・運営：会員登録、ログイン、コンテンツ提供、クラウド同期\n- サービス改善：利用状況分析、バグ修正、新機能開発\n- カスタマーサポート：問い合わせ対応、お知らせの送信\n- 法的義務の履行：関連法令に基づく記録保存",
          },
          {
            title: "3. 個人情報の保有・利用期間",
            body: "当社はサービス利用期間中、個人情報を保有します。退会時には速やかに削除しますが、法令により保存が必要な場合はその期間保管します。\n\n- 電子商取引関連記録：5年\n- 消費者苦情・紛争処理記録：3年\n- アクセスログ：3ヶ月",
          },
          {
            title: "4. 第三者への提供",
            body: "当社はユーザーの事前同意なく個人情報を第三者に提供しません。ただし、以下の場合は例外とします。\n\n- ユーザーが事前に同意した場合\n- 法令の規定、または捜査機関の要請がある場合",
          },
          {
            title: "5. 個人情報処理の委託",
            body: "円滑なサービス提供のため、個人情報処理業務を以下のとおり委託します。\n\n- 受託者：Google LLC / 委託業務：OAuth認証サービス\n- 受託者：AWS（Amazon Web Services）/ 委託業務：クラウドサーバー運営・データ保存",
          },
          {
            title: "6. ユーザーの権利",
            body: "ユーザーはいつでも以下の権利を行使できます。\n\n- 個人情報の閲覧請求\n- 個人情報の訂正・削除請求\n- 個人情報処理の停止請求\n- 同意の撤回\n\nアプリ内のアカウント設定またはカスタマーサポートを通じて行使できます。",
          },
          {
            title: "7. 個人情報保護責任者",
            body: "当社は個人情報処理に関する業務を統括する個人情報保護責任者を指定します。\n\n- 氏名：ハン・ヨハン\n- メール：privacy@graphnode.app\n- 対応時間：平日 09:00～18:00（祝日除く）",
          },
          {
            title: "8. プライバシーポリシーの変更",
            body: "本プライバシーポリシーは、法令・ポリシーの変更またはサービスの変化に応じて改定されることがあります。変更時は少なくとも7日前にアプリまたはウェブサイトでお知らせします。",
          },
        ],
      },
      {
        version: "v2",
        effectiveDate: "2024-09-01",
        label: "旧バージョン（2024年9月1日 ～ 2025年2月28日）",
        sections: [
          {
            title: "1. 収集する個人情報",
            body: "【必須項目】\n- Google OAuthによるメールアドレス、氏名\n- サービス利用履歴、アクセスログ\n\n【任意項目】\n- ユーザーが入力したニックネーム",
          },
          {
            title: "2. 利用目的",
            body: "- サービス提供：会員登録、ログイン、コンテンツ提供\n- サービス改善：利用分析、バグ修正\n- カスタマーサポート：問い合わせ対応",
          },
          {
            title: "3. 保有・利用期間",
            body: "サービス利用期間中保有し、退会時に速やかに削除します。\n\n- 電子商取引記録：5年\n- 消費者苦情記録：3年",
          },
          {
            title: "4. 第三者への提供",
            body: "ユーザーの事前同意なく個人情報を第三者に提供しません。",
          },
          {
            title: "5. 個人情報保護責任者",
            body: "- 氏名：ハン・ヨハン\n- メール：privacy@graphnode.app",
          },
        ],
      },
      {
        version: "v1",
        effectiveDate: "2024-03-01",
        label: "初版（2024年3月1日 ～ 2024年8月31日）",
        sections: [
          {
            title: "1. 収集する個人情報",
            body: "当社はGoogle OAuthによりメールアドレスと氏名を収集します。",
          },
          {
            title: "2. 利用目的",
            body: "収集した情報はログインおよびアカウント管理のみに使用します。",
          },
          {
            title: "3. 保有・利用期間",
            body: "退会時に即時削除します。",
          },
          {
            title: "4. 個人情報保護責任者",
            body: "メール：privacy@graphnode.app",
          },
        ],
      },
    ],
  },
};

export default privacyPolicyData;
