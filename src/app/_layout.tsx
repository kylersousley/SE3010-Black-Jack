import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTransparent: false,
        headerStyle: { backgroundColor: '#0B6623' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: "bold" },
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="index" options={{ title: "Blackjack", headerShown: false }} />
        <Stack.Screen name="game" options={{ title: "Table" }} />
      </Stack>
    </>
  );
}
