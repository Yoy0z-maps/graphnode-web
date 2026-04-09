import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const memberKeys = [
  { key: "kanghyunil", name: "강현일", avatar: "Strategy" },
  { key: "kimkyungdeok", name: "김경덕", avatar: "AI" },
  { key: "kojunseo", name: "고준서", avatar: "Research" },
  { key: "noisaak", name: "노이삭", avatar: "PM" },
  { key: "hanwooseok", name: "한우석", avatar: "Model" },
  { key: "hanyohan", name: "한요한", avatar: "UI" },
  { key: "seouminji", name: "서민지", avatar: "Data" },
  { key: "parkjunbeom", name: "박준범", avatar: "Backend" },
  { key: "leejeongheon", name: "이종헌", avatar: "Ops" },
  { key: "kwongeunmo", name: "권근모", avatar: "Legal" },
  { key: "immuryang", name: "임무량", avatar: "Vision" },
] as const;

const teamSignals = [
  "Cross-functional build",
  "Research-driven product",
  "Fast iteration rhythm",
];

const valueCards = [
  {
    title: "Build with structure",
    text:
      "GraphNode started from the belief that better organization creates better thinking, not just prettier notes.",
  },
  {
    title: "Blend AI with context",
    text:
      "The team is shaping a workflow where assistants can operate inside connected information rather than isolated prompts.",
  },
  {
    title: "Design for momentum",
    text:
      "The product experience is being pushed toward motion, feedback, and visual confidence so the interface feels active.",
  },
];

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="px-6 pb-24 pt-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-6 flex flex-wrap gap-3">
              {teamSignals.map((signal, index) => (
                <motion.span
                  key={signal}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.45 }}
                  className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-white/80 backdrop-blur"
                >
                  {signal}
                </motion.span>
              ))}
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
              {t("team.eyebrow", { defaultValue: "The people behind the graph" })}
            </p>
            <h2 className="max-w-4xl text-5xl font-black tracking-[-0.05em] text-white md:text-7xl">
              {t("team.title")}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {t("team.subtitle")}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
              Tsinghua AI and Computer Organization
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-[32px] border border-white/10 bg-linear-to-br from-slate-900/88 via-slate-950/88 to-cyan-950/55 p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
              {t("team.projectIntro.title")}
            </p>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate-300">
              <p>{t("team.projectIntro.paragraph1")}</p>
              <p>{t("team.projectIntro.paragraph2")}</p>
              <p>{t("team.projectIntro.paragraph3")}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {memberKeys.map((member, index) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur"
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 via-transparent to-fuchsia-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="inline-flex rounded-2xl border border-white/12 bg-slate-950/65 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
                  {member.avatar}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">
                  {t(`team.members.${member.key}.name`, { defaultValue: member.name })}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                  {t(`team.members.${member.key}.role`)}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {t(`team.members.${member.key}.description`, {
                    defaultValue: "Focused on building a stronger GraphNode experience.",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {valueCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="rounded-[28px] border border-white/10 bg-slate-950/55 p-7"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-2xl font-bold text-white">{card.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
