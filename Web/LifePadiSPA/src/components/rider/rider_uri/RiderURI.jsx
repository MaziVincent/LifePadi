import baseUrl from "../../../api/baseUrl";

<<<<<<< HEAD
export const toggleRiderStatusUrl = baseUrl + 'rider/toggleRiderStatus/{id}'
export const ridersCountUrl = baseUrl + 'dashboard/numberOfRiders';
export const activeRidersCountUrl = baseUrl + 'dashboard/numberOfActiveRiders';
export const notActiveRidersCountUrl = baseUrl + 'dashboard/numberOfNonActiveRiders';
export const verifiedRidersCountUrl = baseUrl + 'dashboard/numberOfVerifiedRiders';
export const notVerifiedRidersCountUrl = baseUrl + 'dashboard/numberOfUnverifiedRiders';
export const riderOrdersUrl = baseUrl + 'rider/{id}/getOrders';
export const successfulDeliveriesUrl = baseUrl + 'rider/{id}/successfulDeliveries';
export const pendingDeliveriesUrl = baseUrl + 'rider/{id}/pendingDeliveries';
export const riderDeliveriesWithStatus = baseUrl + 'rider'; //add /{id}/{status} from the component before using this url
export const failedDeliveriesUrl = baseUrl + 'rider/{id}/unsuccessfulDeliveries';

export const riderStatsUrl = baseUrl + 'dashboard/riderStats';

export const updateStatusUrl = baseUrl + 'delivery/{id}/updateStatus';
export const riderDeliveriesWithStatusCountUrl =
  baseUrl + 'delivery/getWithStatusCount/{riderId}'
export const riderDeliveriesWithStatusUrl = baseUrl + 'delivery/getWithStatus/{riderId}'; //add status from query params
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export const successfulDeliveriesCountUrl =
  baseUrl + 'delivery/successful/rider/' //add riderId from the component before using this url
export const pendingDeliveriesCountUrl =
  baseUrl + 'delivery/pending/rider/' //add riderId from the component before using this url

export const riderDeliveriesUrl = baseUrl + 'delivery/rider/'; //add riderId from the component before using this url
export const updateDeliveryOrderStatusUrl = baseUrl + 'delivery/updateBothStatus'; //add orderId, deliveryId and deliveryStatus as query params

export const getDeliveryUrl = baseUrl + 'delivery/get/{id}';
=======
=======
>>>>>>> d8a3578 (created a modal for view and update)
=======
>>>>>>> ed8a669 (still getting the delivery count)
export const riderDeliveriesUrl = baseUrl + 'delivery/rider/{riderId}';
=======
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
>>>>>>> fe84f75 (added rider url)
<<<<<<< HEAD
>>>>>>> 110b09c (added rider url)
=======
=======
=======
export const successfulDeliveriesCountUrl =
  baseUrl + 'delivery/successful/rider/{riderId}'
export const pendingDeliveriesCountUrl =
  baseUrl + 'delivery/pending/rider/{riderId}'
>>>>>>> 1387920 (still getting the delivery count)

export const riderDeliveriesUrl = baseUrl + 'delivery/rider/'; //add riderId from the component before using this url
<<<<<<< HEAD
>>>>>>> ae93a7b (created a modal for view and update)
<<<<<<< HEAD
>>>>>>> d8a3578 (created a modal for view and update)
=======
=======
export const updateDeliveryOrderStatusUrl = baseUrl + 'delivery/updateBothStatus'; //add orderId, deliveryId and deliveryStatus as query params
>>>>>>> 06231f6 (still working on updating delivery status)
>>>>>>> 1795118 (still working on updating delivery status)
