import { Colors } from "@/constants/Colors";
import { Tabs } from "@/components/Tabs";
import TabIcon from "@/components/TabIcon";
import icons from "@/constants/icons";

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.dark,
            }}
        >
            <Tabs.Screen
                name="today"
                options={{
                    title: "Today",
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <TabIcon focused={focused} icon={icons.today} />
                    ),
                }}
            />
            <Tabs.Screen
                name="upcoming"
                options={{
                    title: "Upcoming",
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <TabIcon focused={focused} icon={icons.calendar} />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <TabIcon focused={focused} icon={icons.search} />
                    ),
                }}
            />
            <Tabs.Screen
                name="browse"
                options={{
                    title: "Browse",
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <TabIcon focused={focused} icon={icons.document} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
