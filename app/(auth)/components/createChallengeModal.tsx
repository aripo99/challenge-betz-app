import { Button, ButtonText, Modal, Icon, CloseIcon, ModalBackdrop, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalBody, Heading, Text } from "@gluestack-ui/themed";

interface CreateChallengeModalProps {
    showCreateModal: boolean;
    setShowCreateModal: (showCreateModal: boolean) => void;
    ref: React.RefObject<HTMLDivElement>;
}

export default function CreateChallengeModal({ showCreateModal, setShowCreateModal, ref }: CreateChallengeModalProps) {
    return (
        <Modal
            isOpen={showCreateModal}
            onClose={() => {
                setShowCreateModal(false)
            }}
            finalFocusRef={ref}
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">Engage with Modals</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Text>
                        Elevate user interactions with our versatile modals. Seamlessly
                        integrate notifications, forms, and media displays. Make an impact
                        effortlessly.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            setShowCreateModal(false)
                        }}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="positive"
                        borderWidth="$0"
                        onPress={() => {
                            setShowCreateModal(false)
                        }}
                    >
                        <ButtonText>Explore</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}