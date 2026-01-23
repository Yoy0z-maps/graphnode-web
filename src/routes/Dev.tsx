import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Dev() {
  const location = useLocation();

  // /dev 경로 정확히 일치하면 /dev/docs로 리다이렉트
  if (location.pathname === "/dev") {
    return <Navigate to="/dev/docs" replace />;
  }

  return <Outlet />;
}

// <Outlet />은 react-router-dom에서 중첩 라우트의 자식 컴포넌트를 렌더링할 위치를 지정하는 컴포넌트입니다.

//   App.tsx
//   <Route path="/dev" element={<Dev />}>        // 부모
//     <Route path="docs" element={<DocsLayout />} />  // 자식
//   </Route>

//   Dev.tsx
//   export default function Dev() {
//     return <Outlet />;  // 여기에 DocsLayout이 렌더링됨
//   }

//   동작 방식:
//   - /dev/docs 접근 시 → Dev 컴포넌트가 렌더링되고, <Outlet /> 자리에
//   DocsLayout이 들어감
//   - /dev/status 접근 시 → Dev 컴포넌트가 렌더링되고, <Outlet /> 자리에 Status가
//   들어감

//   공통 레이아웃이 필요하면 Outlet 주변에 추가하면 됩니다:

//   export default function Dev() {
//     return (
//       <div>
//         <header>Dev 공통 헤더</header>
//         <Outlet />  {/* 자식 라우트가 여기에 렌더링 */}
//         <footer>Dev 공통 푸터</footer>
//       </div>
//     );
//   }
