import { Card, Heading, Text, Pressable } from '@gluestack-ui/themed'
import { Challenge } from '../home'
import { Link } from 'expo-router'
import AppleStyleSwipeableRow from './swipeableRow'
import { supabase } from '@/utils/supabase'

function convertUTCToPSTDateString(utcDateString: any) {
    const date = new Date(utcDateString);
    return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    const handleComplete = async () => {
        const { data: { user: User } } = await supabase.auth.getUser()
        const { data: challengeData, error: challengeError } = await supabase.from("user_challenges").select("*").eq("user_id", User?.id || "").eq("challenge_id", challenge.challenge_id).single();
        if (challengeError) {
            console.error('Error loading user challenge:', challengeError.message);
        } else {
            if (challengeData.last_updated_at === new Date().toDateString()) {
                console.log('Already completed today')
                return
            }
            const yesterday = new Date() - 1000 * 60 * 60 * 24;
            const streak = challengeData.last_updated_at === yesterday ? challengeData.streak + 1 : 1;
            const { data: updatedChallenge, error: updateError } = await supabase.from("user_challenges").update({ progress: challengeData.progress + 1, streak: streak }).eq("user_id", User?.id || "").eq("challenge_id", challenge.challenge_id).single();
            if (updateError) {
                console.error('Error updating user challenge:', updateError.message);
            }
        }
        console.log('complete')
    }

    return (
        <AppleStyleSwipeableRow
            onComplete={handleComplete}
        >
            <Link key={challenge.challenge_id} href={`/challenge/${challenge.challenge_id}?challengeName=${challenge.challenge_name}&challengeDescription=${challenge.challenge_description}`} asChild>
                <Pressable>
                    <Card size="md" variant="outline" m="$3">
                        <Heading mb="$1" size="md">
                            {challenge.challenge_name}
                        </Heading>
                        <Text size="sm">{challenge.challenge_description}</Text>
                    </Card>
                </Pressable>
            </Link>
        </AppleStyleSwipeableRow>

    )
}