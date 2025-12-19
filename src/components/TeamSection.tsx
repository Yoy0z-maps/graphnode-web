export default function TeamSection() {
  const teamMembers = [
    {
      name: "팀원 1",
      role: "프론트엔드 개발자",
      description: "React와 TypeScript 전문가",
      avatar: "👨‍💻",
    },
    {
      name: "팀원 2",
      role: "백엔드 개발자",
      description: "서버 아키텍처 설계",
      avatar: "👩‍💻",
    },
    {
      name: "팀원 3",
      role: "디자이너",
      description: "UI/UX 디자인",
      avatar: "🎨",
    },
    {
      name: "팀원 4",
      role: "프로덕트 매니저",
      description: "제품 기획 및 관리",
      avatar: "📊",
    },
  ];
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">TACO 4기 GraphNode 팀</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            지식 그래프를 통해 더 나은 학습과 생산성을 추구하는 팀입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#40444b]/50 p-6 rounded-xl border border-[#40444b] hover:border-[#5865f2] transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4 text-center">{member.avatar}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-[#5865f2] font-medium mb-2 text-center">
                {member.role}
              </p>
              <p className="text-gray-400 text-sm text-center">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-[#5865f2]/20 to-[#4752c4]/20 rounded-2xl p-12 border border-[#5865f2]/30">
          <h3 className="text-3xl font-bold mb-6 text-center">프로젝트 소개</h3>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              GraphNode는 지식 그래프를 시각화하고 관리하는 데스크톱
              애플리케이션입니다. 노트 작성, AI 채팅, 그리고 그래프 시각화를
              하나의 플랫폼에서 제공합니다.
            </p>
            <p>
              TACO 4기 프로젝트로 시작된 GraphNode는 사용자가 복잡한 지식 구조를
              직관적으로 이해하고 관리할 수 있도록 돕는 것을 목표로 합니다.
            </p>
            <p>
              Electron과 React를 기반으로 개발되었으며, 크로스 플랫폼 지원을
              통해 다양한 운영체제에서 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
