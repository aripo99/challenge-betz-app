import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView, Box, Text } from '@gluestack-ui/themed';

export default function Challenge() {
    const { id } = useLocalSearchParams();
    const [userChallenges, setUserChallenges] = useState([]);

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
            setUserChallenges(data);
        }
    }

    const tableHead = ['User ID', 'Progress', 'Streak'];
    const tableData = userChallenges.map(item => [item.user_id, item.progress, item.streak]);

    return (
        <ScrollView style={styles.container}>
            <Box>
                <Text fontSize="xl" color="white" mb="4">Challenge {id}</Text>
                <Box bg="gray.800" borderRadius="md" p="4">
                    <Table borderStyle={styles.tableBorder}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                    <Text mt="2" color="gray.400" textAlign="center">Challenge Progress Table</Text>
                </Box>
            </Box>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
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