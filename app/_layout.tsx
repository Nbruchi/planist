import { Stack, useRouter, useSegments, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Suspense, useEffect } from "react";
import { View, ActivityIndicator, LogBox } from "react-native";
import { Colors } from "@/constants/Colors";
import { tokenCache } from "@/lib/cache";
import { Toaster } from "sonner-native";
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { addDummyData } from "@/lib/addDummyData";
import { config } from "@/lib/config";

const publishableKey = config.env.clerk.publishableKey as string;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

LogBox.ignoreLogs(["Clerk:Clerk has been loaded with development keys"]);

const InitialLayout = () => {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoaded) return;

        const inAuthGroup = segments[0] === "(authenticated)";

        if (isSignedIn && !inAuthGroup) {
            router.replace(`/(authenticated)/(tabs)/today`);
        } else if (!isSignedIn && pathname !== "/") {
            router.replace("/");
        }
    }, [isSignedIn, pathname, segments]);

    if (!isLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.background },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="(authenticated)" />
        </Stack>
    );
};

function Loading() {
    return <ActivityIndicator size="large" color={Colors.primary} />;
}

export default function RootLayout() {
    const expoDb = openDatabaseSync("todos.db");
    const db = drizzle(expoDb);
    const { success } = useMigrations(db, migrations);

    useEffect(() => {
        if (!success) return;
        addDummyData(db);
    }, [success]);

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <ClerkLoaded>
                <Suspense fallback={<Loading />}>
                    <SQLiteProvider
                        databaseName="todos.db"
                        options={{ enableChangeListener: true }}
                        useSuspense
                    >
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <Toaster />
                            <InitialLayout />
                        </GestureHandlerRootView>
                    </SQLiteProvider>
                </Suspense>
            </ClerkLoaded>
        </ClerkProvider>
    );
}
