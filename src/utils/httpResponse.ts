import type { HttpResponse } from "@taco_tsinghua/graphnode-sdk";

/**
 * HttpResponse에서 성공 데이터를 추출합니다.
 * 실패 시 에러를 throw합니다.
 *
 * @example
 * const data = unwrapResponse(await api.graph.getSnapshot());
 */
export function unwrapResponse<T>(response: HttpResponse<T>): T {
  if (response.isSuccess) {
    return response.data;
  }
  throw new Error(response.error?.message || "Unknown error");
}
