import React from "react";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";

export default function Ex01() {
  const scheduleNotificationAsync = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Thông báo ngay!",
        body: "Đây là nội dung thông báo được gửi ngay lập tức 🚀",
      },
      trigger: null,
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Gửi ngay" onPress={scheduleNotificationAsync} />
    </View>
  );
}
