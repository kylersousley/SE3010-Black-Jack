import { Stack } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerTransparent: false,
      headerBackground: () => (
        <LinearGradient
          colors={['#000', '#0B6623']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      ),
      headerTintColor: 'white' 
    }}>
      <Stack.Screen name="index" options={{ title: "Blackjack" }} />
      <Stack.Screen name="game" options={{ title: "Game" }} />
    </Stack>
  );
}
