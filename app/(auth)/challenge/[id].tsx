import { View, Text } from '@gluestack-ui/themed';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function Challenge() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>Challenge {id}</Text>
        </View>
    )
}