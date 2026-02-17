import { useTranslation } from "react-i18next";

const memberKeys = [
  { key: "kanghyunil", name: "강현일", avatar: "👨‍💻" },
  { key: "kimkyungdeok", name: "김경덕", avatar: "🤖" },
  { key: "kojunseo", name: "고준서", avatar: "🧠" },
  { key: "noisaak", name: "노이삭", avatar: "📊" },
  { key: "hanwooseok", name: "한우석", avatar: "🤖" },
  { key: "hanyohan", name: "한요한", avatar: "💻" },
] as const;

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">{t("team.title")}</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-2">
            Tsinghua AI and Computer Organization
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {memberKeys.map((member, index) => (
            <div
              key={index}
              className="bg-[#40444b]/50 p-6 rounded-xl border border-[#40444b] hover:border-[#5865f2] transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4 text-center">{member.avatar}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-[#5865f2] font-medium mb-2 text-center">
                {t(`team.members.${member.key}.role`)}
              </p>
              {t(`team.members.${member.key}.description`) && (
                <p className="text-gray-400 text-sm text-center">
                  {t(`team.members.${member.key}.description`)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-[#5865f2]/20 to-[#4752c4]/20 rounded-2xl p-12 border border-[#5865f2]/30">
          <h3 className="text-3xl font-bold mb-6 text-center">
            {t("team.projectIntro.title")}
          </h3>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>{t("team.projectIntro.paragraph1")}</p>
            <p>{t("team.projectIntro.paragraph2")}</p>
            <p>{t("team.projectIntro.paragraph3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
