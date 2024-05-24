import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{ title: 'Challenge Betz' }} />
            <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge Betz', headerBackTitle: 'Home' }} />
        </Stack>
    )
}