import 'package:flutter/material.dart';

class ErrandsPage extends StatelessWidget {
  const ErrandsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Errands'),
      ),
      body: const Center(
        child: Text('Errands Page'),
      ),
    );
  }
}
