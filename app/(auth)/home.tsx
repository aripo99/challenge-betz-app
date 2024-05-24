import { Button, ButtonText, Card, Modal, Icon, CloseIcon, ModalBackdrop, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalBody, Heading, ScrollView, Text } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabase';
import React from 'react';

interface Challenge {
    id: number;
    name: string;
    description: string;
    isCompleted: boolean;
}

export default function Home() {
    const [challenge, setChallenge] = useState('');
    const [loading, setLoading] = useState(false);
    const [challenges, setChallenges] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false)
    const ref = React.useRef(null)

    useEffect(() => {
        loadChallenges();
    }, []);

    async function loadChallenges() {
        const {
            data: challenges,
            error,
        } = await supabase.from('challenges').select('*');

        if (error) {
            console.error('Error loading challenges:', error.message);
        } else {
            console.log(challenges);
            setChallenges(challenges);
        }
    }

    const addChallenge = async () => {
        const {
            data: { user: User },
        } = await supabase.auth.getUser();

        console.log(User);
        const newChallenge = {
            created_by: User?.id,
            challenge_name: 'temp' || challenge.name,
            challenge_description: 'temp' || challenge.description,
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

    return (
        <>
            <ScrollView>
                <Text m="$4" style={{ fontSize: 24, textAlign: 'center', color: '#fff' }}>
                    Your Challenges
                </Text>

                {challenges.map(challenge => (
                    <Link key={challenge.challenge_id} href={`/challenge/${challenge.id}`} asChild>
                        <Pressable>
                            <Card size="md" variant="outline" m="$3">
                                <Heading mb="$1" size="md">
                                    {challenge.challenge_name}
                                </Heading>
                                <Text size="sm">{challenge.challenge_description}</Text>
                            </Card>
                        </Pressable>
                    </Link>
                ))}

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
                <Button
                    size="md"
                    variant="outline"
                    action="primary"
                    m="$3"
                    onPress={() => setShowCreateModal(true)}
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
            </ScrollView >
        </>
    )
}