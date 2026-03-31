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
    effectiveDate: "2026-04-01",
    intro:
      "GraphNode 서비스(이하 '서비스')를 이용해 주셔서 감사합니다. GraphNode는 이용자가 입력한 노트, 문서, 대화 및 기타 정보(이하 \"콘텐츠\")를 기반으로 지식 그래프를 생성하고 시각화하는 서비스입니다.\n본 약관은 GraphNode 서비스 운영자(이하 \"운영자\")가 제공하는 서비스의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.",
    sections: [
      {
        title: "약관의 효력 및 변경",
        body: "본 약관은 이용자가 GraphNode 서비스에 가입하거나 서비스를 이용하기 시작하는 시점부터 효력이 발생합니다. 운영자는 서비스 운영, 관련 법령의 변경 또는 기술적·관리적 필요가 있는 경우 본 약관을 변경할 수 있으며, 약관이 변경되는 경우 변경 내용과 적용일자를 서비스 화면 또는 관련 페이지를 통해 사전에 공지합니다. 이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 계정을 탈퇴할 수 있습니다.",
      },
      {
        title: "서비스의 제공",
        body: "운영자는 이용자에게 다음과 같은 서비스를 제공합니다.\n\n• 노트 및 문서 입력 기능\n• 인공지능 기반 콘텐츠 분석 기능\n• 지식 그래프 생성 및 시각화 기능\n• 콘텐츠 간 관계 분석 기능\n• 지식 탐색 및 검색 기능\n• 그래프 재구성 및 연결 추천 기능\n• 기타 운영자가 추가로 제공하는 기능\n\n서비스의 일부 기능은 그래프 토큰 또는 구독 플랜에 따라 이용이 제한될 수 있습니다.",
      },
      {
        title: "계정",
        body: "이용자는 서비스 이용을 위하여 개인 계정을 생성하여야 하며, 해당 계정은 이용자 본인만 사용할 수 있고 제3자에게 양도·대여하거나 공유할 수 없습니다. 이용자는 자신의 계정 정보에 대한 관리 책임을 부담하며, 계정 정보의 관리 소홀 또는 제3자의 부정 사용으로 인하여 발생하는 손해에 대하여 운영자는 책임을 지지 않습니다.",
      },
      {
        title: "서비스 이용 및 요금",
        body: "서비스는 다음과 같은 방식으로 제공될 수 있습니다.\n\n• 무료 플랜\n• 유료 구독 플랜\n\n유료 서비스 이용 시 이용자는 서비스에 표시된 요금 및 결제 조건에 따라 요금을 지불해야 합니다. 그래프 토큰은 서비스에서 인공지능 연산을 수행할 때 자동으로 차감될 수 있습니다.",
      },
      {
        title: "서비스의 변경 및 중단",
        body: "운영자는 다음과 같은 경우 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.\n\n• 서비스 개선 또는 기술적 필요\n• 제3자 서비스 변경\n• 불가항력적 사유",
      },
      {
        title: "이용자의 의무",
        body: "이용자는 다음 행위를 하여서는 안 됩니다.\n\n• 타인의 계정을 도용하는 행위\n• 서비스 운영을 방해하는 행위\n• 불법 콘텐츠를 업로드하는 행위\n• 서비스 시스템을 해킹하거나 침해하는 행위\n• 법령 또는 공공질서에 반하는 행위",
      },
      {
        title: "콘텐츠",
        body: "이용자가 서비스에 업로드하거나 입력한 콘텐츠에 대한 저작권 및 관련 권리는 원칙적으로 이용자에게 귀속됩니다. 다만 이용자는 서비스 제공 및 운영을 위하여 필요한 범위 내에서 운영자가 해당 콘텐츠를 저장, 처리 및 분석하는 것에 동의하며, 운영자는 서비스 품질 향상 및 기능 개선을 위하여 콘텐츠를 익명화 또는 비식별화된 형태로 분석할 수 있습니다.",
      },
      {
        title: "AI 기능 및 결과",
        body: "서비스는 인공지능 기술을 활용하여 분석 결과, 요약, 지식 그래프 및 기타 자동 생성 정보를 제공할 수 있으며, 이러한 인공지능 생성 결과는 참고를 위한 정보로 제공됩니다. 운영자는 해당 결과의 정확성, 완전성 또는 신뢰성을 보장하지 않으며, 이용자는 인공지능 결과를 기반으로 한 판단 또는 행위로 인해 발생하는 결과에 대하여 스스로 책임을 부담합니다.",
      },
      {
        title: "외부 서비스 및 데이터",
        body: "서비스는 Google, OpenAI, Deepseek 등 제3자 인공지능 서비스 또는 클라우드 서비스를 이용하여 제공될 수 있으며, MCP(Model Context Protocol) 또는 기타 외부 데이터 소스를 통해 데이터를 수집하거나 활용할 수 있습니다. 다만 외부 서비스의 정책 변경, 장애 또는 서비스 중단 등의 사유로 인해 서비스의 일부 기능이 제한되거나 변경될 수 있습니다.\n\n서비스는 이용자의 데이터를 다음 환경에 저장할 수 있습니다.\n\n• Google Cloud Platform 또는 기타 클라우드 인프라",
      },
      {
        title: "책임의 제한",
        body: "운영자는 다음 사항에 대해 책임을 지지 않습니다.\n\n• 이용자의 귀책 사유로 발생한 손해\n• 인공지능 분석 결과에 대한 의존으로 발생한 손해\n• 외부 서비스 장애로 발생한 손해\n• 불가항력적 사유로 발생한 서비스 중단",
      },
      {
        title: "서비스 업데이트",
        body: "GraphNode 서비스는 서비스 개선 및 기술 발전을 위하여 지속적인 기능 업데이트가 이루어질 수 있으며, 이러한 업데이트에는 인공지능 모델의 변경, 그래프 생성 방식의 변경, 사용자 인터페이스의 변경, 기능의 추가 또는 삭제 등이 포함될 수 있습니다. 이용자는 이러한 서비스 업데이트로 인해 서비스의 기능, 구성 또는 인터페이스가 변경될 수 있음에 동의합니다.",
      },
      {
        title: "서비스 종료",
        body: "운영자는 서비스 운영이 어려운 경우 서비스를 종료할 수 있습니다. 서비스 종료 시 운영자는 합리적인 기간 동안 이용자에게 사전 공지합니다.",
      },
      {
        title: "준거법 및 관할",
        body: "본 약관은 대한민국 법률에 따라 해석됩니다. 서비스 이용과 관련하여 분쟁이 발생할 경우 대한민국 법원을 전속 관할 법원으로 합니다.\n\n적용 일자: 2026년 04월 01일",
      },
    ],
  },

  en: {
    title: "Terms of Service",
    effectiveDate: "2026-04-01",
    intro:
      "Thank you for using GraphNode (hereinafter 'Service'). GraphNode is a service that generates and visualizes knowledge graphs based on notes, documents, conversations, and other information (hereinafter \"Content\") entered by users.\nThese Terms govern the rights, obligations, responsibilities, and other matters between the operator (hereinafter \"Operator\") of GraphNode and users with respect to the use of the service.",
    sections: [
      {
        title: "Effect and Changes to Terms",
        body: "These Terms take effect when a user registers for or begins using the GraphNode service. The Operator may amend these Terms as necessary for service operation, changes in applicable laws, or technical/administrative needs. If the Terms are amended, the changes and effective date will be announced in advance through the service interface or relevant pages. If a user does not agree to the amended Terms, they may discontinue use and withdraw their account.",
      },
      {
        title: "Service Provision",
        body: "The Operator provides users with the following services:\n\n• Note and document input\n• AI-based content analysis\n• Knowledge graph generation and visualization\n• Relationship analysis between content\n• Knowledge exploration and search\n• Graph restructuring and connection recommendations\n• Other features additionally provided by the Operator\n\nSome features may be restricted depending on graph tokens or subscription plans.",
      },
      {
        title: "Account",
        body: "Users must create a personal account to use the service. The account may only be used by the account holder and may not be transferred, loaned, or shared with third parties. Users are responsible for managing their account information, and the Operator is not liable for any damages resulting from negligent account management or unauthorized use by third parties.",
      },
      {
        title: "Service Use and Fees",
        body: "The service may be provided in the following ways:\n\n• Free plan\n• Paid subscription plan\n\nFor paid services, users must pay fees according to the rates and payment terms displayed in the service. Graph tokens may be automatically deducted when AI computations are performed within the service.",
      },
      {
        title: "Changes and Suspension of Service",
        body: "The Operator may change or suspend all or part of the service in the following cases:\n\n• Service improvement or technical necessity\n• Changes to third-party services\n• Force majeure events",
      },
      {
        title: "User Obligations",
        body: "Users must not engage in the following activities:\n\n• Unauthorized use of another user's account\n• Interfering with service operations\n• Uploading illegal content\n• Hacking or infringing the service system\n• Acts contrary to law or public order",
      },
      {
        title: "Content",
        body: "Copyright and related rights to content uploaded or entered by users into the service belong in principle to the user. However, users agree that the Operator may store, process, and analyze such content to the extent necessary for service provision and operation. The Operator may analyze content in anonymized or de-identified form for service quality improvement and feature enhancement.",
      },
      {
        title: "AI Features and Results",
        body: "The service may use AI technology to provide analysis results, summaries, knowledge graphs, and other automatically generated information. Such AI-generated results are provided for reference purposes only. The Operator does not guarantee the accuracy, completeness, or reliability of such results, and users bear sole responsibility for any consequences arising from decisions or actions based on AI-generated results.",
      },
      {
        title: "External Services and Data",
        body: "The service may be provided using third-party AI services or cloud services such as Google, OpenAI, and Deepseek, and may collect or utilize data through MCP (Model Context Protocol) or other external data sources. However, some service features may be restricted or changed due to policy changes, outages, or service interruptions by external services.\n\nThe service may store user data in the following environments:\n\n• Google Cloud Platform or other cloud infrastructure",
      },
      {
        title: "Limitation of Liability",
        body: "The Operator is not liable for:\n\n• Damages caused by the user's own actions\n• Damages resulting from reliance on AI analysis results\n• Damages caused by external service failures\n• Service interruptions due to force majeure events",
      },
      {
        title: "Service Updates",
        body: "GraphNode may undergo continuous feature updates for service improvement and technological advancement. Such updates may include changes to AI models, changes to graph generation methods, changes to the user interface, and addition or removal of features. Users agree that the service's features, configuration, or interface may change as a result of these updates.",
      },
      {
        title: "Service Termination",
        body: "The Operator may terminate the service if service operation becomes difficult. Upon termination, the Operator will notify users in advance within a reasonable period.",
      },
      {
        title: "Governing Law and Jurisdiction",
        body: "These Terms are governed by and construed in accordance with the laws of the Republic of Korea. Any disputes related to the use of the service shall be subject to the exclusive jurisdiction of the courts of the Republic of Korea.\n\nEffective Date: April 1, 2026",
      },
    ],
  },

  zh: {
    title: "服务条款",
    effectiveDate: "2026-04-01",
    intro:
      "感谢您使用 GraphNode（以下简称「服务」）。GraphNode 是一项基于用户输入的笔记、文档、对话及其他信息（以下简称「内容」）生成并可视化知识图谱的服务。\n本条款旨在规定 GraphNode 服务运营者（以下简称「运营者」）与用户之间在使用服务方面的权利、义务、责任事项及其他必要事宜。",
    sections: [
      {
        title: "条款的效力及变更",
        body: "本条款自用户注册 GraphNode 服务或开始使用服务之时起生效。运营者可因服务运营、相关法律法规变更或技术·管理需要而修改本条款。条款变更时，将通过服务页面或相关页面提前公告变更内容及适用日期。如用户不同意变更后的条款，可停止使用服务并注销账户。",
      },
      {
        title: "服务内容",
        body: "运营者向用户提供以下服务：\n\n• 笔记及文档输入功能\n• 基于人工智能的内容分析功能\n• 知识图谱生成与可视化功能\n• 内容间关系分析功能\n• 知识探索与搜索功能\n• 图谱重构及关联推荐功能\n• 运营者额外提供的其他功能\n\n部分功能可能因图谱令牌或订阅计划而受到限制。",
      },
      {
        title: "账户",
        body: "用户须创建个人账户方可使用服务，该账户仅限用户本人使用，不得转让、出借或与第三方共享。用户对自身账户信息负有管理责任，因账户信息管理疏忽或第三方未经授权使用而造成的损失，运营者不承担责任。",
      },
      {
        title: "服务使用及费用",
        body: "服务可通过以下方式提供：\n\n• 免费计划\n• 付费订阅计划\n\n使用付费服务时，用户须按服务中显示的费率及支付条件支付费用。在服务中执行人工智能运算时，图谱令牌可能会被自动扣除。",
      },
      {
        title: "服务变更及中断",
        body: "运营者在以下情况下可变更或中断全部或部分服务：\n\n• 服务改进或技术需要\n• 第三方服务变更\n• 不可抗力事由",
      },
      {
        title: "用户义务",
        body: "用户不得进行以下行为：\n\n• 盗用他人账户\n• 妨碍服务运营\n• 上传违法内容\n• 入侵或侵害服务系统\n• 违反法律法规或公共秩序的行为",
      },
      {
        title: "内容",
        body: "用户上传或输入至服务中的内容，其著作权及相关权利原则上归属于用户。但用户同意运营者在提供及运营服务所需范围内对相关内容进行存储、处理和分析。运营者可将内容以匿名化或去标识化形式进行分析，以提升服务质量和改善功能。",
      },
      {
        title: "AI功能及结果",
        body: "服务可利用人工智能技术提供分析结果、摘要、知识图谱及其他自动生成信息，此类人工智能生成结果仅作参考信息提供。运营者不保证相关结果的准确性、完整性或可靠性，用户须自行承担基于人工智能结果作出判断或行动所产生的一切后果。",
      },
      {
        title: "外部服务及数据",
        body: "服务可能通过 Google、OpenAI、Deepseek 等第三方人工智能服务或云服务提供，并可通过 MCP（模型上下文协议）或其他外部数据源收集或利用数据。但因外部服务政策变更、故障或服务中断等原因，服务的部分功能可能受到限制或变更。\n\n服务可能将用户数据存储于以下环境：\n\n• Google Cloud Platform 或其他云基础设施",
      },
      {
        title: "责任限制",
        body: "运营者对以下事项不承担责任：\n\n• 因用户自身原因造成的损失\n• 因依赖人工智能分析结果造成的损失\n• 因外部服务故障造成的损失\n• 因不可抗力导致的服务中断",
      },
      {
        title: "服务更新",
        body: "GraphNode 服务可能为改善服务及推动技术发展而持续进行功能更新，此类更新可能包括人工智能模型变更、图谱生成方式变更、用户界面变更、功能增减等。用户同意因服务更新导致服务的功能、构成或界面发生变更。",
      },
      {
        title: "服务终止",
        body: "运营者在服务运营困难时可终止服务。服务终止时，运营者将在合理期限内提前通知用户。",
      },
      {
        title: "准据法及管辖",
        body: "本条款依据大韩民国法律进行解释。与服务使用相关的争议，以大韩民国法院为专属管辖法院。\n\n适用日期：2026年04月01日",
      },
    ],
  },

  ja: {
    title: "利用規約",
    effectiveDate: "2026-04-01",
    intro:
      "GraphNode（以下「サービス」）をご利用いただきありがとうございます。GraphNode は、ユーザーが入力したノート、ドキュメント、会話その他の情報（以下「コンテンツ」）を基に知識グラフを生成・可視化するサービスです。\n本規約は、GraphNode サービス運営者（以下「運営者」）が提供するサービスの利用に関し、運営者とユーザーとの間の権利・義務・責任事項およびその他必要な事項を定めることを目的とします。",
    sections: [
      {
        title: "規約の効力および変更",
        body: "本規約は、ユーザーが GraphNode サービスに登録またはサービスの利用を開始した時点から効力を有します。運営者は、サービス運営、関連法令の変更、または技術的・管理的必要がある場合に本規約を変更することができます。規約が変更される場合、変更内容および適用日をサービス画面または関連ページを通じて事前に告知します。ユーザーが変更された規約に同意しない場合、サービスの利用を停止しアカウントを退会することができます。",
      },
      {
        title: "サービスの提供",
        body: "運営者はユーザーに以下のサービスを提供します。\n\n• ノートおよびドキュメント入力機能\n• AI ベースのコンテンツ分析機能\n• 知識グラフの生成および可視化機能\n• コンテンツ間の関係分析機能\n• 知識の探索および検索機能\n• グラフの再構成および接続推薦機能\n• 運営者が追加で提供するその他の機能\n\n一部の機能はグラフトークンまたはサブスクリプションプランによって利用が制限される場合があります。",
      },
      {
        title: "アカウント",
        body: "ユーザーはサービスを利用するために個人アカウントを作成する必要があり、当該アカウントはユーザー本人のみが使用でき、第三者への譲渡・貸与・共有はできません。ユーザーは自身のアカウント情報の管理責任を負い、アカウント情報の管理不備または第三者による不正使用により生じた損害について運営者は責任を負いません。",
      },
      {
        title: "サービスの利用および料金",
        body: "サービスは以下の方式で提供される場合があります。\n\n• 無料プラン\n• 有料サブスクリプションプラン\n\n有料サービスを利用する場合、ユーザーはサービスに表示された料金および支払条件に従って料金を支払う必要があります。グラフトークンは、サービス内で AI 演算を実行する際に自動的に消費される場合があります。",
      },
      {
        title: "サービスの変更および中断",
        body: "運営者は以下の場合にサービスの全部または一部を変更または中断することができます。\n\n• サービス改善または技術的必要\n• 第三者サービスの変更\n• 不可抗力による事由",
      },
      {
        title: "ユーザーの義務",
        body: "ユーザーは以下の行為を行ってはなりません。\n\n• 他人のアカウントを不正使用する行為\n• サービス運営を妨害する行為\n• 違法なコンテンツをアップロードする行為\n• サービスシステムをハッキングまたは侵害する行為\n• 法令または公序良俗に反する行為",
      },
      {
        title: "コンテンツ",
        body: "ユーザーがサービスにアップロードまたは入力したコンテンツの著作権および関連する権利は原則としてユーザーに帰属します。ただし、ユーザーはサービスの提供および運営に必要な範囲内で、運営者が当該コンテンツを保存・処理・分析することに同意します。運営者はサービス品質の向上および機能改善のためにコンテンツを匿名化または非識別化した形で分析することができます。",
      },
      {
        title: "AI 機能および結果",
        body: "サービスは AI 技術を活用して分析結果、要約、知識グラフその他の自動生成情報を提供することがあり、これらの AI 生成結果は参考情報として提供されます。運営者は当該結果の正確性、完全性または信頼性を保証せず、ユーザーは AI 結果に基づいた判断または行為により生じた結果について自ら責任を負います。",
      },
      {
        title: "外部サービスおよびデータ",
        body: "サービスは Google、OpenAI、Deepseek などの第三者 AI サービスまたはクラウドサービスを利用して提供される場合があり、MCP（Model Context Protocol）またはその他の外部データソースを通じてデータを収集・活用することがあります。ただし、外部サービスのポリシー変更、障害またはサービス中断などの理由により、サービスの一部機能が制限または変更される場合があります。\n\nサービスはユーザーのデータを以下の環境に保存することがあります。\n\n• Google Cloud Platform またはその他のクラウドインフラ",
      },
      {
        title: "責任の制限",
        body: "運営者は以下の事項について責任を負いません。\n\n• ユーザーの帰責事由により生じた損害\n• AI 分析結果への依存により生じた損害\n• 外部サービスの障害により生じた損害\n• 不可抗力による事由によるサービス中断",
      },
      {
        title: "サービスの更新",
        body: "GraphNode サービスはサービス改善および技術発展のために継続的な機能更新が行われることがあり、このような更新には AI モデルの変更、グラフ生成方式の変更、ユーザーインターフェースの変更、機能の追加または削除などが含まれることがあります。ユーザーはこれらのサービス更新によりサービスの機能、構成またはインターフェースが変更される場合があることに同意します。",
      },
      {
        title: "サービスの終了",
        body: "運営者はサービスの運営が困難な場合、サービスを終了することができます。サービス終了時、運営者は合理的な期間内にユーザーへ事前に通知します。",
      },
      {
        title: "準拠法および管轄",
        body: "本規約は大韓民国の法律に従い解釈されます。サービスの利用に関して紛争が生じた場合、大韓民国の裁判所を専属的な管轄裁判所とします。\n\n適用日：2026年04月01日",
      },
    ],
  },
};

export default termsData;
