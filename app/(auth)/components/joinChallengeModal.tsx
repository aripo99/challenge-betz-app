import { Button, ButtonText, Modal, Icon, Input, InputField, CloseIcon, ModalBackdrop, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalBody, Heading } from "@gluestack-ui/themed";
import { Challenge } from "../home";
import { useState } from "react";
import { supabase } from '@/utils/supabase';

interface JoinChallengeModalProps {
    showJoinModal: boolean;
    setShowJoinModal: (showJoinModal: boolean) => void;
    ref: React.RefObject<HTMLDivElement>;
    setChallenges: (challenges: Challenge[]) => void;
    challenges: Challenge[];
}

export default function JoinChallengeModal({ showJoinModal, setShowJoinModal, ref, setChallenges, challenges }: JoinChallengeModalProps) {
    const [challengePassword, setChallengePassword] = useState('');

    const joinChallenge = async () => {
        const { data: challenge, error } = await supabase.from('challenges').select('*').eq('password', challengePassword).single();
        if (error) {
            console.log('Error joining challenge:', error.message);
        }
        else {
            const {
                data: { user: User },
            } = await supabase.auth.getUser();
            const { error } = await supabase.from('user_challenges').insert({ user_id: User?.id, challenge_id: challenge.challenge_id, user_name: User?.user_metadata.display_name });
            if (error) {
                console.log('Error inserting user challenge:', error.message);
            }
            else {
                setChallenges([...challenges, challenge]);
            }
        }
    }

    const handleJoinChallenge = () => {
        joinChallenge();
        setShowJoinModal(false);
    }

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
                        <InputField
                            placeholder="Enter challenge password here"
                            value={challengePassword}
                            onChangeText={setChallengePassword}
                        />
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
                        onPress={handleJoinChallenge}
                    >
                        <ButtonText>Join</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}