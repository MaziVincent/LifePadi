/**
 * Default response shape for API hooks (`useFetch`, `usePost`, `useUpdate`,
 * `useDelete`, `useActivate`, `useDeactivate`, `useGet`).
 *
 * The backend wraps most successful responses in some combination of
 * `{ result, dataList, data, success, message, ... }`. This permissive
 * record-style type lets existing call sites continue to access these fields
 * without forcing every caller to retype them, while still being more
 * descriptive than `any`.
 *
 * Call sites that want stronger typing should pass an explicit generic, e.g.:
 *
 * ```ts
 * const fetcher = useFetch();
 * const res = await fetcher<MyResponse>(url, token);
 * ```
 */
export interface ApiResponseBody {
	result?: any;
	dataList?: any;
	data?: any;
	success?: boolean;
	message?: string;
	error?: unknown;
	status?: number;
	[key: string]: any;
}
