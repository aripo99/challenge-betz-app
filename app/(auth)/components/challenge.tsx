import { Card, Heading, Text, Pressable } from '@gluestack-ui/themed'
import { Challenge } from '../home'
import { Link } from 'expo-router'
import AppleStyleSwipeableRow from './swipeableRow'

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    return (
        <Link key={challenge.challenge_id} href={`/challenge/${challenge.challenge_id}?challengeName=${challenge.challenge_name}&challengeDescription=${challenge.challenge_description}`} asChild>
            <AppleStyleSwipeableRow
                onToggle={() => { console.log('toggle') }}
                onDelete={() => { console.log('delete') }}
            >
                <Pressable>
                    <Card size="md" variant="outline" m="$3">
                        <Heading mb="$1" size="md">
                            {challenge.challenge_name}
                        </Heading>
                        <Text size="sm">{challenge.challenge_description}</Text>
                    </Card>
                </Pressable>
            </AppleStyleSwipeableRow>
        </Link>

    )
}