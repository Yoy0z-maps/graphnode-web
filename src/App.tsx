import { Route, Routes } from "react-router-dom";
import "./App.css";
import Status from "./routes/Status";
import Home from "./routes/Home";
import Team from "./routes/Team";
import Feedback from "./routes/Feedback";
import Pricing from "./routes/Pricing";
import Dev from "./routes/Dev";
import DocsLayout from "./routes/dev/docs/DocsLayout";
import DocsIntro from "./routes/dev/docs/Intro";
import DocsChangeLog from "./routes/dev/docs/ChangeLog";
import DocsApiReference from "./routes/dev/docs/ApiReference";
import DocsMCP from "./routes/dev/docs/MCP";
import InteractionsOverview from "./routes/dev/docs/interactions/Overview";
import ExtendingCLI from "./routes/dev/docs/extending/CLI";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import Terms from "./routes/Terms";
import AdminLogin from "./routes/admin/AdminLogin";
import AdminLayout from "./routes/admin/AdminLayout";
import Dashboard from "./routes/admin/Dashboard";
import Notices from "./routes/admin/Notices";
import NoticeForm from "./routes/admin/NoticeForm";
import Plans from "./routes/admin/Plans";
import AdminPrivacy from "./routes/admin/AdminPrivacy";
import AdminTerms from "./routes/admin/AdminTerms";
import LegalEditor from "./routes/admin/LegalEditor";
import FeedbackList from "./routes/admin/FeedbackList";
import FeedbackDetail from "./routes/admin/FeedbackDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/dev" element={<Dev />}>
        <Route path="status" element={<Status />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsIntro />} />
          <Route path="intro" element={<DocsIntro />} />
          <Route path="change-log" element={<DocsChangeLog />} />
          <Route path="api-reference" element={<DocsApiReference />} />
          <Route path="mcp" element={<DocsMCP />} />
          <Route
            path="interactions/overview"
            element={<InteractionsOverview />}
          />
          <Route path="extending/cli" element={<ExtendingCLI />} />
        </Route>
      </Route>
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="notices" element={<Notices />} />
        <Route path="notices/new" element={<NoticeForm />} />
        <Route path="notices/:id/edit" element={<NoticeForm />} />
        <Route path="plans" element={<Plans />} />
        <Route path="privacy" element={<AdminPrivacy />} />
        <Route path="privacy/new" element={<LegalEditor />} />
        <Route path="privacy/:version/edit" element={<LegalEditor />} />
        <Route path="terms" element={<AdminTerms />} />
        <Route path="terms/edit" element={<LegalEditor />} />
        <Route path="feedback" element={<FeedbackList />} />
        <Route path="feedback/:id" element={<FeedbackDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
