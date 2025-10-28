import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { registerForPushNotificationsAsync } from "../utils/notifications";

export default function Ex04() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("👉 Notification tapped!");
        console.log(
          "Data nhận được:",
          response.notification.request.content.data
        );
      }
    );

    return () => subscription.remove();
  }, []);

  const scheduleNotificationAsync = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc học React Native 📘",
        body: "Đây là thông báo có data kèm theo!",
        data: {
          studentId: "SV001",
          course: "React Native",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
      },
    });

    Alert.alert("Đã lên lịch nhắc nhở sau 10 giây.");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Button
        title="Nhắc tôi sau 10 giây"
        onPress={scheduleNotificationAsync}
      />
      <Text style={{ marginTop: 20, textAlign: "center" }}>
        Expo Push Token: {"\n"}
        {expoPushToken ? expoPushToken : "Đang lấy token..."}
      </Text>
    </View>
  );
}
