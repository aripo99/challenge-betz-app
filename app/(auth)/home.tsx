import { Button, ButtonText, Text } from "@gluestack-ui/themed";
export default function Home() {
    return (
        <>
            <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>
                Your Challenges
            </Text>
            <Button
                size="md"
                variant="outline"
                action="primary"
                style={{ marginBottom: 10 }}
            >
                <ButtonText>Create</ButtonText>
            </Button>
            <Button
                size="md"
                variant="outline"
                action="primary"
            >
                <ButtonText>Join</ButtonText>
            </Button>
        </>
    )
}