import { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

preventAutoHideAsync();

export default function Layout() {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) await hideAsync();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;
    return <Stack onLayout={onLayoutRootView} />;
}
