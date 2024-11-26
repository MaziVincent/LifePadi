import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/order_item.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/widgets/widgets.dart';

class RiderOrderList extends StatelessWidget {
  const RiderOrderList({super.key, required this.status});

  final OrderStatus status;

  @override
  Widget build(BuildContext context) {
    final dummyOrders = [
      Order(
        id: 1,
        orderId: 'ORD001',
        status: OrderStatus.pending,
        items: [
          OrderItem(
            id: 454,
            quantity: 1,
            amount: 15000,
            totalAmount: 15000,
            name: 'Cake',
            description: 'Eat cake of life',
            orderId: 1,
            productId: 70,
            product: Product(
              id: 70,
              name: 'Cake',
              description: 'Eat cake of life',
              price: 15000,
              imageUrl: 'https://via.placeholder.com/150',
              vendor: Vendor(
                id: 147,
                name: 'Oma Sweet',
                address: LocationDetails(
                  latitude: 0,
                  longitude: 0,
                  address: 'Azuiyi Udene, Abakaliki 480105, Ebonyi',
                  city: 'Abakaliki',
                  state: 'Ebonyi',
                  postalCode: '480105',
                  sublocality: 'Azuiyi Udene',
                  localGovernmentArea: 'Abakaliki',
                ),
                phoneNumber: '08138699452',
              ),
              category: Category(
                id: 1,
                name: 'Drinks',
                icon: 'https://via.placeholder.com/150',
              ),
            ),
          ),
          OrderItem(
            id: 455,
            quantity: 1,
            amount: 1200,
            totalAmount: 1200,
            name: 'Bottle Water',
            description: 'Drink of life',
            orderId: 1,
            productId: 71,
            product: Product(
              id: 71,
              name: 'Bottle Water',
              description: 'Drink of life',
              price: 1200,
              vendor: Vendor(
                id: 148,
                name: 'Dreamlink Concepts, Abakaliki',
                address: LocationDetails(
                  latitude: 0,
                  longitude: 0,
                  address: '83VP+87C, Kpiri Kpiri, Abakaliki 480211, Ebonyi',
                  city: 'Abakaliki',
                  state: 'Ebonyi',
                  postalCode: '480211',
                  sublocality: 'Kpiri Kpiri',
                  localGovernmentArea: 'Abakaliki',
                ),
                phoneNumber: '07012345678',
              ),
              imageUrl: 'https://via.placeholder.com/150',
              category: Category(
                id: 1,
                name: 'Drinks',
                icon: 'https://via.placeholder.com/150',
              ),
            ),
          ),
        ],
        isDelivered: false,
        type: CheckoutType.cart,
        createdAt: DateTime.now(),
        deliveryLocation: LocationDetails(
          latitude: 0,
          longitude: 0,
          address: 'Ebonyi State University, Abakaliki 480211, Ebonyi',
          city: 'Abakaliki',
          state: 'Ebonyi',
          postalCode: '480105',
          sublocality: 'Azuiyi Udene',
          localGovernmentArea: 'Abakaliki',
        ),
      ),
      Order(
        id: 2,
        orderId: 'ORD002',
        status: OrderStatus.pending,
        items: [],
        isDelivered: false,
        type: CheckoutType.logistics,
        createdAt: DateTime.now(),
        pickupLocation: LocationDetails(
          latitude: 0,
          longitude: 0,
          address: '83VP+87C, Kpiri Kpiri, Abakaliki 480211, Ebonyi',
          city: 'Abakaliki',
          state: 'Ebonyi',
          postalCode: '480211',
          sublocality: 'Kpiri Kpiri',
          localGovernmentArea: 'Abakaliki',
        ),
        deliveryLocation: LocationDetails(
          latitude: 0,
          longitude: 0,
          address: 'Azuiyi Udene, Abakaliki 480105, Ebonyi',
          city: 'Abakaliki',
          state: 'Ebonyi',
          postalCode: '480105',
          sublocality: 'Azuiyi Udene',
          localGovernmentArea: 'Abakaliki',
        ),
      ),
    ];

    return ListView.separated(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
      itemCount: dummyOrders.length,
      separatorBuilder: (context, index) => SizedBox(height: 16.h),
      itemBuilder: (context, index) {
        final order = dummyOrders[index];
        return RiderOrderTile(order: order);
      },
    );
  }
}
