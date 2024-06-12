import { Button, ButtonText, ScrollView, Text } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabase';
import React from 'react';
import CreateChallengeModal from "./components/createChallengeModal";
import JoinChallengeModal from "./components/joinChallengeModal";
import { askNotificationPermission } from "@/utils/notifications";
import { ChallengeCard } from "./components/challenge";

export interface Challenge {
    challenge_id: number;
    challenge_name: string;
    challenge_description: string;
    created_by: string;
}

function convertUTCToPSTDateString(utcDateString: string): string {
    const date = new Date(utcDateString);
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}

export default function Home() {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const ref = React.useRef(null);

    useEffect(() => {
        loadChallenges();
        askNotificationPermission();
    }, []);

    async function loadChallenges() {
        const {
            data: { user: User },
        } = await supabase.auth.getUser();

        const {
            data: challengeData,
            error,
        } = await supabase.from('challenges').select(`challenge_description, challenge_name, challenge_id, user_challenges(progress, streak, last_updated_at)`).eq('created_by', User?.id);

        if (error) {
            console.error('Error loading challenges:', error.message);
        } else {
            const today = convertUTCToPSTDateString(new Date().toDateString());
            const updatedChallenges = challengeData?.map((challenge: any) => {
                const lastUpdatedAt = convertUTCToPSTDateString(new Date(challenge.user_challenges[0].last_updated_at).toDateString());
                challenge.isComplete = lastUpdatedAt === today && challenge.user_challenges[0].progress > 0;
                return challenge;
            }) || [];
            setChallenges(updatedChallenges);
        }
    }

    return (
        <>
            <ScrollView>
                <Text m="$4" style={{ fontSize: 24, textAlign: 'center', color: '#fff' }}>
                    Your Challenges
                </Text>

                {challenges.map(challenge => (
                    <ChallengeCard challenge={challenge} />
                ))}

                <CreateChallengeModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} ref={ref} setChallenges={setChallenges} challenges={challenges} />
                <JoinChallengeModal showJoinModal={showJoinModal} setShowJoinModal={setShowJoinModal} ref={ref} setChallenges={setChallenges} challenges={challenges} />

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
                    mb="$6"
                    onPress={() => setShowJoinModal(true)}
                >
                    <ButtonText>Join</ButtonText>
                </Button>
            </ScrollView >
        </>
    )
}