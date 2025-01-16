import { withLayoutContext } from "expo-router";
import {
    createBottomTabNavigator,
    BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

const { Navigator } = createBottomTabNavigator();

export const Tabs = withLayoutContext<
    BottomTabNavigationOptions,
    typeof Navigator,
    any,
    any
>(Navigator);
