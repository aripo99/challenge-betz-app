import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
    const onLogout = async () => {
        await supabase.auth.signOut();
    }
    return (
        <GestureHandlerRootView>
            <Stack>
                <Stack.Screen name="home" options={{
                    title: 'Challenge Betz', headerRight: () => (
                        <Pressable onPress={onLogout}>
                            <Ionicons name="log-out-outline" size={24} color="#fff" />
                        </Pressable>
                    )
                }} />
                <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge Betz', headerBackTitle: 'Home' }} />
            </Stack>
        </GestureHandlerRootView>
    )
}