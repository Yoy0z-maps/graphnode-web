export type TermsSection = {
  title: string;
  body: string;
};

export type TermsData = {
  title: string;
  effectiveDate: string;
  intro: string;
  sections: TermsSection[];
};

const termsData: Record<string, TermsData> = {
  ko: {
    title: "이용약관",
    effectiveDate: "2025-03-01",
    intro:
      "본 이용약관은 GraphNode(이하 '회사')가 제공하는 서비스의 이용에 관한 조건과 절차를 규정합니다. 서비스를 이용하시면 본 약관에 동의한 것으로 간주합니다.",
    sections: [
      {
        title: "제1조 (목적)",
        body: "본 약관은 회사가 제공하는 GraphNode 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.",
      },
      {
        title: "제2조 (정의)",
        body: "① '서비스'란 회사가 제공하는 지식 그래프 기반 AI 대화 관리 플랫폼 및 관련 부가 서비스를 의미합니다.\n② '이용자'란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.\n③ '계정'이란 이용자가 서비스를 이용하기 위해 생성한 Google 인증 기반의 식별 정보를 의미합니다.",
      },
      {
        title: "제3조 (약관의 효력 및 변경)",
        body: "① 본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다.\n② 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 변경 시 적용 일자 및 사유를 명시하여 최소 7일 전에 공지합니다.",
      },
      {
        title: "제4조 (서비스 이용)",
        body: "① 서비스는 Google OAuth 인증을 통해 이용할 수 있습니다.\n② 이용자는 서비스를 개인적, 비상업적 목적으로만 이용할 수 있습니다.\n③ 회사는 서비스의 품질 개선을 위해 사전 통지 후 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.",
      },
      {
        title: "제5조 (이용자의 의무)",
        body: "이용자는 다음 행위를 해서는 안 됩니다.\n\n① 타인의 정보를 도용하거나 허위 정보를 등록하는 행위\n② 회사의 지식재산권을 침해하는 행위\n③ 서비스의 안정적 운영을 방해하는 행위 (해킹, 과부하 유발 등)\n④ 불법·유해 콘텐츠를 생성, 전송, 게시하는 행위\n⑤ 상업적 광고·홍보 목적의 무단 사용\n⑥ 관련 법령을 위반하는 행위",
      },
      {
        title: "제6조 (콘텐츠의 권리)",
        body: "① 이용자가 서비스 내에서 생성한 콘텐츠(노트, 대화 내역 등)의 저작권은 이용자에게 귀속됩니다.\n② 회사는 서비스 운영, 개선 및 홍보 목적으로 이용자의 콘텐츠를 익명화하여 활용할 수 있습니다.\n③ 서비스에서 제공하는 소프트웨어, 디자인, 로고 등의 지식재산권은 회사에 귀속됩니다.",
      },
      {
        title: "제7조 (서비스 이용 제한)",
        body: "회사는 이용자가 본 약관을 위반하거나 다음에 해당하는 경우 서비스 이용을 제한하거나 계정을 해지할 수 있습니다.\n\n① 타인의 권리를 침해하거나 법령에 위반되는 행위\n② 서비스 운영을 고의로 방해하는 행위\n③ 장기간 미이용 시 (12개월 이상)",
      },
      {
        title: "제8조 (면책 조항)",
        body: "① 회사는 천재지변, 전쟁, 해킹 등 불가항력적 사유로 서비스를 제공하지 못한 경우 책임을 지지 않습니다.\n② 회사는 이용자의 귀책 사유로 발생한 서비스 이용 장애에 대해 책임을 지지 않습니다.\n③ 회사는 이용자가 서비스를 통해 기대하는 수익이나 결과를 보장하지 않습니다.",
      },
      {
        title: "제9조 (준거법 및 분쟁 해결)",
        body: "① 본 약관은 대한민국 법률에 따라 해석됩니다.\n② 서비스 이용과 관련한 분쟁은 회사의 소재지를 관할하는 법원에서 해결합니다.",
      },
      {
        title: "부칙",
        body: "본 약관은 2025년 3월 1일부터 시행됩니다.",
      },
    ],
  },

  en: {
    title: "Terms of Service",
    effectiveDate: "2025-03-01",
    intro:
      "These Terms of Service govern your use of the services provided by GraphNode (hereinafter 'the Company'). By using our services, you agree to these terms.",
    sections: [
      {
        title: "Article 1 (Purpose)",
        body: "These Terms govern the relationship between the Company and users with respect to the use of the GraphNode service (hereinafter 'Service'), including the rights, obligations, and responsibilities of each party.",
      },
      {
        title: "Article 2 (Definitions)",
        body: "① 'Service' refers to the knowledge graph-based AI conversation management platform and related services provided by the Company.\n② 'User' refers to any person who agrees to these Terms and uses the Service.\n③ 'Account' refers to the Google OAuth-based identity created by a user to access the Service.",
      },
      {
        title: "Article 3 (Effect and Changes to Terms)",
        body: "① These Terms take effect when posted on the Service interface or otherwise communicated to users.\n② The Company may revise these Terms within the scope permitted by applicable law. Users will be notified at least 7 days before changes take effect, with the effective date and reason clearly stated.",
      },
      {
        title: "Article 4 (Use of Service)",
        body: "① The Service is accessible via Google OAuth authentication.\n② Users may use the Service for personal, non-commercial purposes only.\n③ The Company may change or suspend part or all of the Service after prior notice for quality improvement.",
      },
      {
        title: "Article 5 (User Obligations)",
        body: "Users must not:\n\n① Impersonate others or register false information\n② Infringe the Company's intellectual property rights\n③ Disrupt the stable operation of the Service (e.g., hacking, overloading)\n④ Create, transmit, or post illegal or harmful content\n⑤ Use the Service for unauthorized commercial advertising or promotion\n⑥ Violate applicable laws and regulations",
      },
      {
        title: "Article 6 (Content Rights)",
        body: "① Copyright in content created by users within the Service (notes, conversation history, etc.) belongs to the respective users.\n② The Company may use anonymized user content for the purpose of operating, improving, and promoting the Service.\n③ Intellectual property rights to the software, design, and logos provided by the Service belong to the Company.",
      },
      {
        title: "Article 7 (Service Restrictions)",
        body: "The Company may restrict service access or terminate accounts in the following cases:\n\n① Acts that infringe the rights of others or violate applicable law\n② Intentional interference with Service operation\n③ Extended inactivity (12 months or more)",
      },
      {
        title: "Article 8 (Disclaimers)",
        body: "① The Company is not liable for service disruptions caused by force majeure events such as natural disasters, war, or hacking.\n② The Company is not liable for service disruptions caused by the user's own actions.\n③ The Company does not guarantee any specific results or revenue from using the Service.",
      },
      {
        title: "Article 9 (Governing Law and Dispute Resolution)",
        body: "① These Terms are governed by and construed in accordance with the laws of the Republic of Korea.\n② Disputes related to the use of the Service shall be resolved in the court having jurisdiction over the Company's location.",
      },
      {
        title: "Supplementary Provisions",
        body: "These Terms are effective as of March 1, 2025.",
      },
    ],
  },

  zh: {
    title: "服务条款",
    effectiveDate: "2025-03-01",
    intro:
      "本服务条款规定了使用GraphNode（以下简称「公司」）提供的服务的相关条件与程序。使用本服务即表示您同意本条款。",
    sections: [
      {
        title: "第一条（目的）",
        body: "本条款旨在规定公司与用户在使用GraphNode服务（以下简称「服务」）过程中的权利、义务及责任事项。",
      },
      {
        title: "第二条（定义）",
        body: "① 「服务」是指公司提供的基于知识图谱的AI对话管理平台及相关附加服务。\n② 「用户」是指同意本条款并使用服务的任何人。\n③ 「账户」是指用户为使用服务而创建的基于Google认证的身份信息。",
      },
      {
        title: "第三条（条款的效力及变更）",
        body: "① 本条款自发布在服务页面或以其他方式通知用户之日起生效。\n② 公司可在法律允许的范围内修订本条款，变更时将注明生效日期及理由，并至少提前7天通知用户。",
      },
      {
        title: "第四条（服务使用）",
        body: "① 服务通过Google OAuth认证方式使用。\n② 用户只能将服务用于个人非商业目的。\n③ 公司可在事先通知后，为提升服务质量对服务部分或全部内容进行变更或中断。",
      },
      {
        title: "第五条（用户义务）",
        body: "用户不得进行以下行为：\n\n① 盗用他人信息或登记虚假信息\n② 侵害公司知识产权\n③ 妨碍服务稳定运营的行为（如黑客攻击、制造过载等）\n④ 创建、传播、发布违法有害内容\n⑤ 未经授权将服务用于商业广告或推广\n⑥ 违反相关法律法规",
      },
      {
        title: "第六条（内容权利）",
        body: "① 用户在服务中创建的内容（笔记、对话记录等）的著作权归用户所有。\n② 公司可将用户内容匿名化后用于服务运营、改善及推广目的。\n③ 服务提供的软件、设计、标志等知识产权归公司所有。",
      },
      {
        title: "第七条（服务限制）",
        body: "在以下情况下，公司可限制用户使用服务或注销账户：\n\n① 侵害他人权利或违反法律的行为\n② 故意妨碍服务运营\n③ 长期未使用（12个月以上）",
      },
      {
        title: "第八条（免责条款）",
        body: "① 因自然灾害、战争、黑客攻击等不可抗力因素导致服务中断的，公司不承担责任。\n② 因用户自身原因导致的服务障碍，公司不承担责任。\n③ 公司不保证用户通过服务获得特定收益或结果。",
      },
      {
        title: "第九条（准据法及争议解决）",
        body: "① 本条款依据大韩民国法律进行解释。\n② 与服务使用相关的争议，在公司所在地有管辖权的法院解决。",
      },
      {
        title: "附则",
        body: "本条款自2025年3月1日起施行。",
      },
    ],
  },

  ja: {
    title: "利用規約",
    effectiveDate: "2025-03-01",
    intro:
      "本利用規約は、GraphNode（以下「当社」）が提供するサービスの利用に関する条件と手続きを定めます。サービスを利用することにより、本規約に同意したものとみなされます。",
    sections: [
      {
        title: "第1条（目的）",
        body: "本規約は、当社が提供するGraphNodeサービス（以下「サービス」）の利用に関して、当社とユーザーとの間の権利・義務・責任事項を定めることを目的とします。",
      },
      {
        title: "第2条（定義）",
        body: "① 「サービス」とは、当社が提供するナレッジグラフベースのAI会話管理プラットフォームおよび関連サービスをいいます。\n② 「ユーザー」とは、本規約に同意してサービスを利用する者をいいます。\n③ 「アカウント」とは、ユーザーがサービスを利用するために作成したGoogle認証ベースの識別情報をいいます。",
      },
      {
        title: "第3条（規約の効力および変更）",
        body: "① 本規約は、サービス画面に掲示またはその他の方法でユーザーに通知した時点から効力を有します。\n② 当社は法令の範囲内で本規約を改定することができ、変更の際は施行日および理由を明記し、少なくとも7日前に通知します。",
      },
      {
        title: "第4条（サービスの利用）",
        body: "① サービスはGoogle OAuth認証を通じて利用できます。\n② ユーザーはサービスを個人的・非商業的目的のみに利用できます。\n③ 当社は品質向上のため、事前通知の上でサービスの一部または全部を変更または中断することがあります。",
      },
      {
        title: "第5条（ユーザーの義務）",
        body: "ユーザーは以下の行為を行ってはなりません。\n\n① 他人の情報を盗用したり、虚偽情報を登録する行為\n② 当社の知的財産権を侵害する行為\n③ サービスの安定的な運営を妨害する行為（ハッキング、過負荷誘発など）\n④ 不法・有害なコンテンツを作成・送信・投稿する行為\n⑤ 商業的広告・宣伝目的の無断利用\n⑥ 関連法令に違反する行為",
      },
      {
        title: "第6条（コンテンツの権利）",
        body: "① ユーザーがサービス内で作成したコンテンツ（メモ、会話履歴など）の著作権はユーザーに帰属します。\n② 当社はサービスの運営・改善・宣伝目的で、ユーザーのコンテンツを匿名化して利用することができます。\n③ サービスが提供するソフトウェア、デザイン、ロゴ等の知的財産権は当社に帰属します。",
      },
      {
        title: "第7条（サービス利用の制限）",
        body: "ユーザーが本規約に違反した場合や以下に該当する場合、当社はサービス利用を制限またはアカウントを解約できます。\n\n① 他人の権利を侵害したり、法令に違反する行為\n② サービス運営を故意に妨害する行為\n③ 長期間未利用（12ヶ月以上）",
      },
      {
        title: "第8条（免責事項）",
        body: "① 天災、戦争、ハッキングなど不可抗力によりサービスを提供できなかった場合、当社は責任を負いません。\n② ユーザーの帰責事由によるサービス障害について、当社は責任を負いません。\n③ 当社はユーザーがサービスを通じて期待する収益や結果を保証しません。",
      },
      {
        title: "第9条（準拠法および紛争解決）",
        body: "① 本規約は大韓民国の法律に従い解釈されます。\n② サービス利用に関する紛争は、当社の所在地を管轄する裁判所で解決します。",
      },
      {
        title: "附則",
        body: "本規約は2025年3月1日より施行します。",
      },
    ],
  },
};

export default termsData;
