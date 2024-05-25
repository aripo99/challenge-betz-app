import { Button, ButtonText, Modal, Icon, Input, InputField, CloseIcon, ModalBackdrop, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalBody, Heading } from "@gluestack-ui/themed";
import { Challenge } from "../home";

interface JoinChallengeModalProps {
    showJoinModal: boolean;
    setShowJoinModal: (showJoinModal: boolean) => void;
    ref: React.RefObject<HTMLDivElement>;
    setChallenges: (challenges: Challenge[]) => void;
}

export default function JoinChallengeModal({ showJoinModal, setShowJoinModal, ref, setChallenges }: JoinChallengeModalProps) {
    return (
        <Modal
            isOpen={showJoinModal}
            onClose={() => {
                setShowJoinModal(false)
            }}
            finalFocusRef={ref}
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">Join a challenge</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Input my="$3">
                        <InputField placeholder="Enter challenge password here" />
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            setShowJoinModal(false)
                        }}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="positive"
                        borderWidth="$0"
                        onPress={() => {
                            setShowJoinModal(false)
                        }}
                    >
                        <ButtonText>Join</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}