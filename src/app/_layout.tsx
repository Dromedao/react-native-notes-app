import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { PaperProvider } from "react-native-paper";
import { initializeDatabase } from "../database/initializeDatabase";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="Note.db" onInit={initializeDatabase}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="NoteView" />
          <Stack.Screen name="AddNote" />
        </Stack>
      </PaperProvider>
    </SQLiteProvider>
  );
}
