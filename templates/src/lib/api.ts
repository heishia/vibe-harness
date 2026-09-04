/**
 * 이 앱 전용 API 클라이언트. 공유 types 패키지에 의존하지 않는다.
 * 이 화면이 쓰는 응답 모양만 여기에 둔다.
 */

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is required");
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly code?: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...rest } = init;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof body.message === "string" ? body.message : "요청에 실패했습니다.";
    throw new ApiError(message, body.code, res.status);
  }
  return body as T;
}
