import React from "react";
import { Alert, Button, View } from "react-native";
import * as Notifications from "expo-notifications";

export default function Ex03() {
  const scheduleNotificationAsync = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc nhở ⏰",
        body: "Đây là thông báo sau 10 giây!",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
      },
    });

    Alert.alert("Đã lên lịch nhắc nhở.");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Nhắc tôi sau 10 giây"
        onPress={scheduleNotificationAsync}
      />
    </View>
  );
}
