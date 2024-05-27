import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView, Box, Text } from '@gluestack-ui/themed';

interface UserChallenge {
    challenge_id: number;
    user_id: string;
    user_name: string;
    progress: number;
    streak: boolean;
    rank: number | '-';
}

export default function Challenge() {
    const { id, challengeName, challengeDescription } = useLocalSearchParams();
    const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);

    useEffect(() => {
        getUserChallenges();
    }, []);

    async function getUserChallenges() {
        const { data, error } = await supabase
            .from('user_challenges')
            .select('*')
            .eq('challenge_id', id);
        if (error) {
            console.error('Error loading challenges:', error.message);
        } else {
            setUserChallenges(assignRanks(data));
        }
    }

    function assignRanks(challenges: UserChallenge[]) {
        // Sort challenges by progress in descending order
        const sortedChallenges = [...challenges].sort((a, b) => b.progress - a.progress);

        // Assign ranks
        let rank = 1;
        for (let i = 0; i < sortedChallenges.length; i++) {
            if (i > 0 && sortedChallenges[i].progress === sortedChallenges[i - 1].progress) {
                sortedChallenges[i].rank = '-';
            } else {
                sortedChallenges[i].rank = rank;
                rank = i + 1 + 1;
            }
        }

        return sortedChallenges;
    }

    const tableHead = ['Rank', 'Name', 'Progress', 'Streak'];
    const tableData = userChallenges.map(item => [item.rank, item.user_name, item.progress, item.streak]);

    return (
        <ScrollView p="$4">
            <Box>
                <Text color="white" mb="$4" pl="$4">{challengeName}</Text>
                <Text pl="$4">{challengeDescription}</Text>
                <Box bg="gray.800" p="$4">
                    <Table borderStyle={styles.tableBorder}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                </Box>
            </Box>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tableBorder: {
        borderWidth: 1,
        borderColor: '#444',
    },
    head: {
        height: 40,
        backgroundColor: '#333',
    },
    headText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10,
    },
});