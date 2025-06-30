import 'package:flutter/material.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({super.key});

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  bool _showAllNotifications = true;

  // Sample notification data
  final List<Map<String, dynamic>> _notifications = [
    {
      'id': '1',
      'title': 'Order Confirmed!',
      'message': 'Your Tonkotsu Ramen order has been confirmed and is being prepared.',
      'time': '2 minutes ago',
      'type': 'order',
      'isRead': false,
      'icon': Icons.check_circle,
      'color': const Color(0xFF4CAF50),
    },
    {
      'id': '2',
      'title': 'Order Ready for Pickup',
      'message': 'Your Karaage Ramen is ready! Please pick it up at the counter.',
      'time': '15 minutes ago',
      'type': 'pickup',
      'isRead': false,
      'icon': Icons.restaurant,
      'color': const Color(0xFF2196F3),
    },
    {
      'id': '3',
      'title': 'Special Offer!',
      'message': 'Get 20% off on all ramen bowls this weekend. Use code: RAMEN20',
      'time': '1 hour ago',
      'type': 'promo',
      'isRead': true,
      'icon': Icons.local_offer,
      'color': const Color(0xFFFF9800),
    },
    {
      'id': '4',
      'title': 'New Menu Item',
      'message': 'Try our new Spicy Miso Ramen! Available now for a limited time.',
      'time': '2 hours ago',
      'type': 'menu',
      'isRead': true,
      'icon': Icons.new_releases,
      'color': const Color(0xFF9C27B0),
    },
    {
      'id': '5',
      'title': 'Order Delivered',
      'message': 'Your Shoyu Ramen has been successfully delivered. Enjoy your meal!',
      'time': '1 day ago',
      'type': 'delivery',
      'isRead': true,
      'icon': Icons.delivery_dining,
      'color': const Color(0xFF4CAF50),
    },
    {
      'id': '6',
      'title': 'Payment Successful',
      'message': 'Payment of ₱210.00 for your order has been processed successfully.',
      'time': '1 day ago',
      'type': 'payment',
      'isRead': true,
      'icon': Icons.payment,
      'color': const Color(0xFF4CAF50),
    },
  ];

  List<Map<String, dynamic>> get filteredNotifications {
    if (_showAllNotifications) {
      return _notifications;
    }
    return _notifications.where((notification) => !notification['isRead']).toList();
  }

  void _toggleNotificationFilter() {
    setState(() {
      _showAllNotifications = !_showAllNotifications;
    });
  }

  void _markAsRead(String notificationId) {
    setState(() {
      final notification = _notifications.firstWhere((n) => n['id'] == notificationId);
      notification['isRead'] = true;
    });
  }

  void _markAllAsRead() {
    setState(() {
      for (var notification in _notifications) {
        notification['isRead'] = true;
      }
    });
  }

  void _deleteNotification(String notificationId) {
    setState(() {
      _notifications.removeWhere((n) => n['id'] == notificationId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          'Notifications',
          style: TextStyle(
            color: Color(0xFF1A1A1A),
            fontSize: 20,
            fontWeight: FontWeight.w700,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1A1A1A)),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          if (filteredNotifications.any((n) => !n['isRead']))
            TextButton(
              onPressed: _markAllAsRead,
              child: const Text(
                'Mark all read',
                style: TextStyle(
                  color: Color(0xFFD32D43),
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          // Filter toggle
          Container(
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _showAllNotifications = true),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        color: _showAllNotifications
                            ? const Color(0xFFD32D43)
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'All',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: _showAllNotifications
                              ? Colors.white
                              : const Color(0xFF1A1A1A),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _showAllNotifications = false),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        color: !_showAllNotifications
                            ? const Color(0xFFD32D43)
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'Unread',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: !_showAllNotifications
                              ? Colors.white
                              : const Color(0xFF1A1A1A),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Notifications list
          Expanded(
            child: filteredNotifications.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: filteredNotifications.length,
                    itemBuilder: (context, index) {
                      final notification = filteredNotifications[index];
                      return _buildNotificationCard(notification);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationCard(Map<String, dynamic> notification) {
    final isUnread = !notification['isRead'];
    
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isUnread 
              ? const Color(0xFFD32D43).withOpacity(0.2)
              : Colors.grey[200]!,
          width: isUnread ? 2 : 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () => _markAsRead(notification['id']),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Notification icon
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: notification['color'].withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    notification['icon'],
                    color: notification['color'],
                    size: 24,
                  ),
                ),
                
                const SizedBox(width: 12),
                
                // Notification content
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              notification['title'],
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: isUnread 
                                    ? FontWeight.w700 
                                    : FontWeight.w600,
                                color: const Color(0xFF1A1A1A),
                              ),
                            ),
                          ),
                          if (isUnread)
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                color: Color(0xFFD32D43),
                                shape: BoxShape.circle,
                              ),
                            ),
                        ],
                      ),
                      
                      const SizedBox(height: 4),
                      
                      Text(
                        notification['message'],
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[600],
                          height: 1.4,
                        ),
                      ),
                      
                      const SizedBox(height: 8),
                      
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            notification['time'],
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[500],
                            ),
                          ),
                          PopupMenuButton<String>(
                            icon: Icon(
                              Icons.more_vert,
                              color: Colors.grey[600],
                              size: 20,
                            ),
                            onSelected: (value) {
                              if (value == 'delete') {
                                _deleteNotification(notification['id']);
                              } else if (value == 'mark_read' && isUnread) {
                                _markAsRead(notification['id']);
                              }
                            },
                            itemBuilder: (context) => [
                              if (isUnread)
                                const PopupMenuItem(
                                  value: 'mark_read',
                                  child: Row(
                                    children: [
                                      Icon(Icons.check, size: 18),
                                      SizedBox(width: 8),
                                      Text('Mark as read'),
                                    ],
                                  ),
                                ),
                              const PopupMenuItem(
                                value: 'delete',
                                child: Row(
                                  children: [
                                    Icon(Icons.delete, size: 18, color: Colors.red),
                                    SizedBox(width: 8),
                                    Text('Delete', style: TextStyle(color: Colors.red)),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            'assets/notif.png',
            width: 120,
            height: 120,
            errorBuilder: (context, error, stackTrace) {
              return Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(60),
                ),
                child: const Icon(
                  Icons.notifications_none,
                  size: 60,
                  color: Color(0xFFD32D43),
                ),
              );
            },
          ),
          const SizedBox(height: 24),
          Text(
            _showAllNotifications ? 'No notifications yet' : 'No unread notifications',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Color(0xFF1A1A1A),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            _showAllNotifications 
                ? 'We\'ll notify you about your orders and special offers'
                : 'All caught up! Check back later for new updates',
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
