import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ChatsPage extends StatelessWidget {
  const ChatsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Chats'),
      body: SuperListView(
        children: [
          ChatTile(
            subject: 'John Bayo',
            content: 'Typing...',
            time: '29 mar',
            inItalics: true,
            image: Assets.images.johnBayo.provider(),
            unreadMessages: 2,
          ),
          const ChatTile(
            subject: 'Lifepadi Support',
            content:
                'Hi David, how may we assist you today with your shopping needs?',
            time: '29 mar',
          ),
        ],
      ),
    );
  }
}
