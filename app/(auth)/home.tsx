import { Button, ButtonText, Card, Heading, Text } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Pressable } from "react-native";

const challenges = [
    {
        id: 1,
        name: 'Go to the gym',
        description: 'It only counts if it\'s more than 30 minutes'
    },
    {
        id: 2,
        name: 'Read',
        description: 'Read for at least 30 minutes'
    }
]

export default function Home() {
    return (
        <>
            <Text m="$4" style={{ fontSize: 24, textAlign: 'center', color: '#fff' }}>
                Your Challenges
            </Text>

            {challenges.map(challenge => (
                <Link href={`/challenge/${challenge.id}`} asChild>
                    <Pressable>
                        <Card size="md" variant="outline" m="$3">
                            <Heading mb="$1" size="md">
                                {challenge.name}
                            </Heading>
                            <Text size="sm">{challenge.description}</Text>
                        </Card>
                    </Pressable>
                </Link>
            ))}

            <Button
                size="md"
                variant="outline"
                action="primary"
                m="$3"
            >
                <ButtonText>Create</ButtonText>
            </Button>
            <Button
                size="md"
                variant="outline"
                action="primary"
                mx="$3"
            >
                <ButtonText>Join</ButtonText>
            </Button>
        </>
    )
}