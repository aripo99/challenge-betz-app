import { Button, ButtonText, Modal, Icon, Input, InputField, CloseIcon, ModalBackdrop, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalBody, Heading, Text } from "@gluestack-ui/themed";
import { supabase } from '@/utils/supabase';

interface CreateChallengeModalProps {
    showCreateModal: boolean;
    setShowCreateModal: (showCreateModal: boolean) => void;
    ref: React.RefObject<HTMLDivElement>;
    setChallenges: (challenges: any) => void;
    challenges: any[];
}

export default function CreateChallengeModal({ showCreateModal, setShowCreateModal, ref, setChallenges, challenges }: CreateChallengeModalProps) {

    const addChallenge = async () => {
        const {
            data: { user: User },
        } = await supabase.auth.getUser();

        console.log(User);
        const newChallenge = {
            created_by: User?.id,
            challenge_name: 'temp1',
            challenge_description: 'temp1',
            challenge_start_date: new Date(),
            challenge_end_date: new Date(),
            password: '123',
        };

        const { data: challenge, error } = await supabase.from('challenges').insert(newChallenge).select('*').single();
        if (error) {
            console.log('Error inserting challenge:', error.message);
        }
        else {
            setChallenges([...challenges, challenge]);
        }
    };

    const handleCreateChallenge = () => {
        addChallenge();
        setShowCreateModal(false);
    }


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
                        onPress={handleCreateChallenge}
                    >
                        <ButtonText>Create</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}