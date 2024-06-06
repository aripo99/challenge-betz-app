import { Card, Heading, Text, Pressable, HStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import AppleStyleSwipeableRow from './swipeableRow'
import { supabase } from '@/utils/supabase'
import { useState } from 'react'
import { StyleSheet } from 'react-native';

function convertUTCToPSTDateString(utcDateString: string): string {
    const date = new Date(utcDateString);
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}

export function ChallengeCard({ challenge }: { challenge: any }) {
    const [userChallenge, setUserChallenge] = useState<any>(challenge);
    const today = convertUTCToPSTDateString(new Date().toDateString());

    const getStreak = () => {
        const lastUpdatedAt = convertUTCToPSTDateString(new Date(userChallenge.last_updated_at || userChallenge.user_challenges[0].last_updated_at).toDateString());
        const streak = userChallenge.streak || userChallenge.user_challenges[0].streak
        if (lastUpdatedAt === today) {
            return streak;
        }
        const yesterday = convertUTCToPSTDateString(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString());
        return lastUpdatedAt >= yesterday ? streak : 0;
    }

    const handleComplete = async () => {
        const { data: { user: User } } = await supabase.auth.getUser()
        const { data: challengeData, error: challengeError } = await supabase.from("user_challenges").select("*").eq("user_id", User?.id || "").eq("challenge_id", challenge.challenge_id).single();
        if (challengeError) {
            console.error('Error loading user challenge:', challengeError.message);
        } else {
            const lastUpdatedAt = convertUTCToPSTDateString(new Date(challengeData.last_updated_at).toDateString());
            if (lastUpdatedAt === today) {
                console.log('Already completed today')
                return
            }
            const yesterday = convertUTCToPSTDateString(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString());
            const streak = lastUpdatedAt === yesterday ? challengeData.streak + 1 : 1;
            const { data: updatedChallenge, error: updateError } = await supabase.from("user_challenges").update({ progress: challengeData.progress + 1, streak: streak, last_updated_at: new Date() }).eq("user_id", User?.id || "").eq("challenge_id", challenge.challenge_id).select("*").single();
            if (updatedChallenge) {
                updatedChallenge.isComplete = true;
                setUserChallenge(updatedChallenge);
            }
            if (updateError) {
                console.error('Error updating user challenge:', updateError.message);
            }
        }
    }

    return (
        <AppleStyleSwipeableRow
            onComplete={handleComplete}
        >
            <Link key={challenge.challenge_id} href={`/challenge/${challenge.challenge_id}?challengeName=${challenge.challenge_name}&challengeDescription=${challenge.challenge_description}`} asChild>
                <Pressable>
                    <Card size="md" variant="outline" style={[styles.card, userChallenge.isComplete && styles.completedCard]}>
                        <Heading mb="$1" size="md" style={styles.heading}>
                            {challenge.challenge_name}
                        </Heading>
                        <Text size="sm" style={styles.description}>
                            {challenge.challenge_description}
                        </Text>
                        <HStack mr="$2" mt="$2">
                            <Text size="sm" mr="$2" style={styles.infoText}>Progress: {userChallenge.progress || userChallenge.user_challenges[0].progress}</Text>
                            <Text size="sm" style={styles.infoText}>Streak: {getStreak()}</Text>
                        </HStack>
                    </Card>
                </Pressable>
            </Link>
        </AppleStyleSwipeableRow >
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderColor: '#ccc',
    },
    completedCard: {
        borderColor: '#004d00',
    },
    heading: {
        color: 'white',
    },
    description: {
        color: 'gray',
    },
    infoText: {
        color: 'gray',
    },
});
