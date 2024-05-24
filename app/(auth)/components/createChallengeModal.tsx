import { Button, ButtonText, Modal, Icon, Input, InputField, CloseIcon, ModalBackdrop, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalBody, Heading, Text } from "@gluestack-ui/themed";

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
                    <Heading size="lg">Create a challenge</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Input my="$3">
                        <InputField placeholder="Enter challenge title here" />
                    </Input>
                    <Input>
                        <InputField placeholder="Enter challenge description here" />
                    </Input>
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
                        <ButtonText>Create</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}