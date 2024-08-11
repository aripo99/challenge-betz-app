import {
    View,
    Button,
    Text,

} from '@gluestack-ui/themed';
import { supabase } from '@/utils/supabase';

export default function Profile() {
    const onDeleteAccountPress = async () => {
        const {
            data: { user: User },
        } = await supabase.auth.getUser();
        if (User) {
            const { data, error } = await supabase.from('users').delete().eq('id', User.id);
            if (error) {
                console.error('Error deleting user:', error.message);
            }
            else {
                await supabase.auth.signOut();
            }
        }
    }
    return (
        <View>
            <Button onPress={onDeleteAccountPress}>
                <Text>
                    Delete Account
                </Text>
            </Button>
        </View>
    )
}