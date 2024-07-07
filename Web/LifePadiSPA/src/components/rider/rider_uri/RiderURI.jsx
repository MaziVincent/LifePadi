import baseUrl from "../../../api/baseUrl";

export const toggleRiderStatus = baseUrl + "rider/toggleRiderStatus";
export const ridersCount = baseUrl + 'dashboard/numberOfRiders';
export const activeRidersCount = baseUrl + 'dashboard/numberOfActiveRiders';
export const notActiveRidersCount = baseUrl + 'dashboard/numberOfNonActiveRiders';
export const verifiedRidersCount = baseUrl + 'dashboard/numberOfVerifiedRiders';
export const notVerifiedRidersCount = baseUrl + 'dashboard/numberOfUnverifiedRiders';
export const riderOrders = baseUrl + 'rider/{id}/getOrders';
export const successfulDeliveries = baseUrl + 'rider/{id}/successfulDeliveries';
export const pendingDeliveries = baseUrl + 'rider/{id}/pendingDeliveries';
export const failedDeliveries = baseUrl + 'rider/{id}/unsuccessfulDeliveries';

export const riderStats = baseUrl + 'dashboard/riderStats';

export const updateStatus = baseUrl + 'delivery/{id}/updateStatus';
export const riderDeliveriesWithStatusCount =
  baseUrl + 'delivery/getWithStatusCount/{riderId}'
export const riderDeliveriesWithStatus = baseUrl + 'delivery/getWithStatus/{riderId}'; //add status from query params