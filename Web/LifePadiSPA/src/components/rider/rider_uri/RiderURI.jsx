import baseUrl from "../../../api/baseUrl";

export const toggleRiderStatusUrl = baseUrl + 'rider/toggleRiderStatus/{id}'
export const ridersCountUrl = baseUrl + 'dashboard/numberOfRiders';
export const activeRidersCountUrl = baseUrl + 'dashboard/numberOfActiveRiders';
export const notActiveRidersCountUrl = baseUrl + 'dashboard/numberOfNonActiveRiders';
export const verifiedRidersCountUrl = baseUrl + 'dashboard/numberOfVerifiedRiders';
export const notVerifiedRidersCountUrl = baseUrl + 'dashboard/numberOfUnverifiedRiders';
export const riderOrdersUrl = baseUrl + 'rider/{id}/getOrders';
export const successfulDeliveriesUrl = baseUrl + 'rider/{id}/successfulDeliveries';
export const pendingDeliveriesUrl = baseUrl + 'rider/{id}/pendingDeliveries';
export const failedDeliveriesUrl = baseUrl + 'rider/{id}/unsuccessfulDeliveries';

export const riderStatsUrl = baseUrl + 'dashboard/riderStats';

export const updateStatusUrl = baseUrl + 'delivery/{id}/updateStatus';
export const riderDeliveriesWithStatusCountUrl =
  baseUrl + 'delivery/getWithStatusCount/{riderId}'
export const riderDeliveriesWithStatusUrl = baseUrl + 'delivery/getWithStatus/{riderId}'; //add status from query params

export const riderDeliveriesUrl = baseUrl + 'delivery/rider/'; //add riderId from the component before using this url
