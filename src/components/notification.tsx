import { useEffect, useState } from "react";
import { View, Text } from "react-native";

type NotificationProps = {
  title: string;
  message: string;
};

export default function Notification() {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  }, [notification]);

  if (!notification) {
    return null;
  }

  return (
    <View className="fixed bottom-0 left-0 right-0 p-5">
      <View className="bg-lime-500 p-5 rounded-lg">
        <Text className="text-white font-body">{notification.title}</Text>
        <Text className="text-white font-body">{notification.message}</Text>
      </View>
    </View>
  );
}
