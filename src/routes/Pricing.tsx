import { useTranslation } from "react-i18next";
import Header from "../components/Header";

const plans = [
  {
    key: "starter",
    cardClassName:
      "border-white/20 bg-linear-to-br from-white/8 to-white/4 shadow-[0_20px_80px_rgba(15,23,42,0.18)]",
    tokenClassName: "border-white/10 bg-white/6 text-slate-200",
    buttonClassName:
      "border border-white/10 bg-white/6 text-white hover:bg-white/10",
    checkClassName: "border-white/10 bg-white/6 text-white/80",
  },
  {
    key: "pro",
    cardClassName:
      "border-cyan-300/35 bg-linear-to-br from-[#19263d] via-[#1e2d48] to-[#213559] shadow-[0_24px_90px_rgba(34,211,238,0.12)]",
    tokenClassName: "border-cyan-300/15 bg-cyan-300/12 text-cyan-100",
    buttonClassName:
      "bg-linear-to-r from-[#4a8cff] to-[#8dc0ff] text-white hover:brightness-110",
    checkClassName: "border-cyan-300/20 bg-cyan-400/15 text-cyan-100",
  },
  {
    key: "max",
    cardClassName:
      "border-amber-300/20 bg-linear-to-br from-[#3d2b1b] via-[#4a311d] to-[#5a3420] shadow-[0_24px_90px_rgba(251,191,36,0.12)]",
    tokenClassName:
      "border-amber-300/15 bg-linear-to-r from-amber-300/14 to-rose-300/12 text-amber-100",
    buttonClassName:
      "bg-linear-to-r from-[#ffc45a] to-[#ff7f66] text-white hover:brightness-110",
    checkClassName: "border-amber-300/20 bg-amber-300/15 text-amber-100",
  },
  {
    key: "team",
    cardClassName:
      "border-emerald-300/20 bg-linear-to-br from-[#15322d] via-[#183c35] to-[#1a4b42] shadow-[0_24px_90px_rgba(16,185,129,0.12)]",
    tokenClassName: "border-emerald-300/15 bg-emerald-300/12 text-emerald-100",
    buttonClassName:
      "bg-linear-to-r from-[#34d399] to-[#2dd4bf] text-slate-950 hover:brightness-110",
    checkClassName: "border-emerald-300/20 bg-emerald-300/15 text-emerald-100",
  },
] as const;

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#07111f] px-4 pb-16 pt-4 text-white md:px-6">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-500/16 blur-3xl" />
        <div className="absolute right-[-10rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/12 blur-3xl" />
      </div>

      <Header currentPage="pricing" />

      <main className="mx-auto max-w-7xl pt-16">
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
            {t("pricing.eyebrow", { defaultValue: "Pricing" })}
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
            {t("pricing.title", {
              defaultValue: "Plans for students, makers, and growing teams",
            })}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {t("pricing.description", {
              defaultValue:
                "Start simple, unlock deeper AI workflows, and scale GraphNode across your team when you are ready.",
            })}
          </p>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2 2xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-[32px] border p-7 backdrop-blur ${plan.cardClassName}`}
            >
              {plan.key === "pro" && (
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[38%] rounded-full bg-[#6fa5ff] px-6 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(111,165,255,0.35)]">
                  {t("pricing.recommended", { defaultValue: "Recommended" })}
                </div>
              )}

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                {t(`pricing.plans.${plan.key}.name`)}
              </p>
              <div className="mt-4 flex items-end gap-2">
                <h2 className="text-5xl font-black tracking-[-0.05em] text-white">
                  {t(`pricing.plans.${plan.key}.price`)}
                </h2>
                <span className="pb-2 text-xl font-semibold text-white/60">
                  {t(`pricing.plans.${plan.key}.period`)}
                </span>
              </div>

              <div
                className={`mt-6 rounded-2xl border px-5 py-4 text-base font-semibold ${plan.tokenClassName}`}
              >
                {t("pricing.tokensLabel", { defaultValue: "Tokens:" })}{" "}
                <span className="ml-2 text-2xl font-black">
                  {t(`pricing.plans.${plan.key}.tokens`)}
                </span>
              </div>

              <p className="mt-6 text-sm leading-6 text-slate-200/85">
                {t(`pricing.plans.${plan.key}.description`)}
              </p>

              <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-white/18 to-transparent" />

              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-100">
                {[0, 1, 2, 3, 4].map((featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${plan.checkClassName}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {t(`pricing.plans.${plan.key}.features.${featureIndex}`)}
                    </p>
                  </div>
                ))}
              </div>

              <button
                className={`mt-10 w-full rounded-2xl px-4 py-3 text-lg font-semibold transition ${plan.buttonClassName}`}
              >
                {t(`pricing.plans.${plan.key}.cta`)}
              </button>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="rounded-4xl border border-white/10 bg-white/6 p-8 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/75">
                  {t("pricing.teamInquiry.eyebrow", {
                    defaultValue: "Team Inquiry",
                  })}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
                  {t("pricing.teamInquiry.title", {
                    defaultValue: "Need a plan for your organization?",
                  })}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  {t("pricing.teamInquiry.description", {
                    defaultValue:
                      "If you need onboarding support, custom integrations, or a team-wide rollout plan, reach out and we will help shape the right GraphNode setup.",
                  })}
                </p>
              </div>

              <a
                href="/feedback"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-100 lg:w-auto"
              >
                {t("pricing.teamInquiry.cta", {
                  defaultValue: "Contact Team",
                })}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
