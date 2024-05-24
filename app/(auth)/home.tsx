import { Button, ButtonText, Text } from "@gluestack-ui/themed";
export default function Home() {
    return (
        <>
            <Text>Home</Text>
            <Button
                size="md"
                variant="outline"
                action="primary"
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