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
      "GraphNode(이하 '회사')는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.",
    versions: [
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        label: "현재 버전 (2025.03.01 ~)",
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
          "개인정보 보호책임자 연락잘 및 처리 시간 상세화",
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
      "GraphNode (hereinafter 'the Company') values your personal information and complies with applicable privacy laws and regulations.",
    versions: [
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        label: "Current Version (Effective March 1, 2025)",
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
    intro: "GraphNode（以下简称「公司」）重视您的个人信息安全，并遵守相关隐私法律法规。",
    versions: [
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        label: "当前版本（自2025年3月1日起生效）",
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
      "GraphNode（以下「当社」）は、ユーザーの個人情報を重視し、関連する個人情報保護法令を遵守します。",
    versions: [
      {
        version: "v3",
        effectiveDate: "2025-03-01",
        label: "現行バージョン（2025年3月1日より適用）",
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
