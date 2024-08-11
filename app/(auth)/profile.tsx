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
        <View style={{ justifyContent: 'center' }}>
            <Text style={{ marginBottom: 20, marginTop: 20 }}>
                Want to delete your account? This action is irreversible.
            </Text>
            <Button onPress={onDeleteAccountPress}>
                <Text>
                    Delete Account
                </Text>
            </Button>
        </View>
    )
}