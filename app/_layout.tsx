import { Stack } from 'expo-router';
import { ItemProvider } from '@/context/ItemContext';
import { SQLiteProvider } from "expo-sqlite";
import { ProfileProvider } from '@/context/ProfileContext';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="items.db">
      <ItemProvider>
        <ProfileProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ headerShown: false }} />
          </Stack>
        </ProfileProvider>
      </ItemProvider>
    </SQLiteProvider>
  );
}
