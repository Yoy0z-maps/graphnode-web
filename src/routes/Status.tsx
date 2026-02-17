import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/icons/logo_white.svg";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: number;
  dailyStatus: ("operational" | "degraded" | "down")[];
}

interface Incident {
  date: string;
  title: string;
  updates: {
    time: string;
    status: string;
    message: string;
  }[];
}

export default function Status() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("day");
  const { t, i18n } = useTranslation();

  // 더미 데이터
  const services: ServiceStatus[] = [
    {
      name: "API",
      status: "operational",
      uptime: 99.98,
      dailyStatus: Array.from({ length: 90 }, (_, i) => {
        // 일부 날짜에 degraded 상태 추가
        if (i === 85 || i === 82) return "degraded";
        return "operational";
      }),
    },
    {
      name: "Push Notifications",
      status: "operational",
      uptime: 100.0,
      dailyStatus: Array(90).fill("operational"),
    },
    {
      name: "LLM Model Gateway",
      status: "operational",
      uptime: 99.5,
      dailyStatus: Array.from({ length: 90 }, (_, i) => {
        // 일부 날짜에 down 상태 추가
        if (i === 88 || i === 75) return "down";
        if (i === 87 || i === 76) return "degraded";
        return "operational";
      }),
    },
  ];

  const incidents: Incident[] = [
    {
      date: "Dec 19, 2025",
      title: t("status.noIncidents"),
      updates: [],
    },
    {
      date: "Dec 18, 2025",
      title: t("status.noIncidentsGeneric"),
      updates: [],
    },
    {
      date: "Dec 17, 2025",
      title: "API response time issues in some regions",
      updates: [
        {
          time: "Dec 17, 10:09 PST",
          status: t("status.resolved", { defaultValue: "Resolved" }),
          message: "This incident has been resolved.",
        },
        {
          time: "Dec 17, 09:56 PST",
          status: t("status.monitoring", { defaultValue: "Monitoring" }),
          message:
            "A fix has been implemented and we are monitoring the results.",
        },
      ],
    },
  ];

  // timeRange에 따른 그래프 데이터 생성
  const generateResponseTimeData = (range: "day" | "week" | "month") => {
    const now = new Date();

    if (range === "day") {
      // 24시간 데이터, 현재 시간까지
      const currentHour = now.getHours();
      return Array.from({ length: 24 }, (_, i) => {
        const hour = (currentHour - 23 + i + 24) % 24;
        return {
          time: `${String(hour).padStart(2, "0")}:00`,
          value: 150 + Math.random() * 50 + (i % 6 === 0 ? 30 : 0),
        };
      });
    } else if (range === "week") {
      // 7일 데이터, 오늘까지
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        const dayName = date.toLocaleDateString(i18n.language, { weekday: "short" });
        const day = date.getDate();
        return {
          time: `${dayName} ${day}`,
          value: 150 + Math.random() * 50 + (i % 2 === 0 ? 20 : 0),
        };
      });
    } else {
      // 30일 데이터, 오늘까지
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - i));
        const month = date.toLocaleDateString(i18n.language, { month: "short" });
        const day = date.getDate();
        return {
          time: `${month} ${day}`,
          value: 150 + Math.random() * 50 + (i % 5 === 0 ? 25 : 0),
        };
      });
    }
  };

  const responseTimeData = generateResponseTimeData(timeRange);
  const currentResponseTime = Math.round(
    responseTimeData[responseTimeData.length - 1]?.value || 164
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "var(--color-status-operational)";
      case "degraded":
        return "var(--color-status-degraded)";
      case "down":
        return "var(--color-status-down)";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return t("status.statusLabels.operational");
      case "degraded":
        return t("status.statusLabels.degraded");
      case "down":
        return t("status.statusLabels.down");
      default:
        return t("status.statusLabels.unknown");
    }
  };

  const maxResponseTime = Math.max(...responseTimeData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-primary h-[340px] text-white flex items-center justify-center gap-8">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-6xl font-bold text-white">GraphNode</p>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* All Systems Operational Banner */}
        <div className="bg-status-operational text-white rounded-sm p-6 mt-8 mb-24 text-start">
          <h2 className="text-2xl font-semibold">{t("status.allOperational")}</h2>
        </div>

        {/* Uptime Info */}
        <div className="text-right text-sm text-gray-500 mb-4">
          {t("status.uptimeInfo")}{" "}
          <a href="#" className="text-primary hover:underline">
            {t("status.viewHistorical")}
          </a>
        </div>

        {/* Service Status List */}
        <div className="space-y-8 mb-24">
          {services.map((service) => (
            <div key={service.name} className="border-b border-gray-200 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-green-600 font-medium">
                  {getStatusText(service.status)}
                </span>
              </div>

              {/* 90-Day Uptime Graph */}
              <div className="mb-4">
                <div className="flex items-end space-x-0.5 h-12 mb-2">
                  {service.dailyStatus.map((status, index) => (
                    <div
                      key={index}
                      className="flex-1"
                      style={{
                        height: "100%",
                        backgroundColor: getStatusColor(status),
                      }}
                      title={`Day ${index + 1}: ${status}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{t("status.daysAgo")}</span>
                  <span>{t("status.today")}</span>
                </div>
              </div>

              {/* Uptime Percentage */}
              <div className="text-sm text-gray-600">
                {t("status.uptime", { value: service.uptime.toFixed(2) })}
              </div>
            </div>
          ))}
        </div>

        {/* System Metrics */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{t("status.systemMetrics")}</h2>
            <div className="flex space-x-2">
              {(["day", "week", "month"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    timeRange === range
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-button-hover hover:text-primary"
                  }`}
                >
                  {t(`status.timeRanges.${range}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{t("status.apiResponseTime")}</h3>
              <div className="text-3xl font-bold">{currentResponseTime} ms</div>
            </div>

            {/* Response Time Graph */}
            <div className="relative h-48 mt-6">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                {/* Y-axis labels */}
                {[0, 100, 200, 300, 400].map((value) => (
                  <g key={value}>
                    <line
                      x1="50"
                      y1={200 - (value / 400) * 180}
                      x2="800"
                      y2={200 - (value / 400) * 180}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text
                      x="40"
                      y={200 - (value / 400) * 180 + 4}
                      fill="#6b7280"
                      fontSize="12"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  </g>
                ))}

                {/* Line graph */}
                <polyline
                  points={responseTimeData
                    .map(
                      (d, i) =>
                        `${50 + (i / (responseTimeData.length - 1)) * 750},${
                          200 - (d.value / maxResponseTime) * 180
                        }`
                    )
                    .join(" ")}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                />

                {/* X-axis labels */}
                {responseTimeData
                  .filter((_, i) => {
                    // day: 모든 시간 표시, week: 매일 표시, month: 5일 간격
                    if (timeRange === "day") return i % 4 === 0;
                    if (timeRange === "week") return true;
                    return i % 5 === 0;
                  })
                  .map((d, i) => {
                    const originalIndex = responseTimeData.findIndex(
                      (item) => item === d
                    );
                    return (
                      <text
                        key={i}
                        x={
                          50 +
                          (originalIndex / (responseTimeData.length - 1)) * 750
                        }
                        y="195"
                        fill="#6b7280"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {d.time}
                      </text>
                    );
                  })}
              </svg>
            </div>
          </div>
        </div>

        {/* Past Incidents */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">{t("status.pastIncidents")}</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="font-semibold text-lg mb-2">
                  {incident.date}
                </div>
                {incident.updates.length === 0 ? (
                  <div className="text-gray-600">{incident.title}</div>
                ) : (
                  <>
                    <div className="font-semibold mb-3">{incident.title}</div>
                    <div className="space-y-3 ml-4">
                      {incident.updates.map((update, updateIndex) => (
                        <div
                          key={updateIndex}
                          className="border-l-2 border-gray-300 pl-4"
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                update.status === "Resolved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {update.status}
                            </span>
                            <span className="text-sm text-gray-500">
                              {update.time}
                            </span>
                          </div>
                          <div className="text-gray-700">{update.message}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
