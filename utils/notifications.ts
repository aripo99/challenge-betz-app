import * as Notifications from 'expo-notifications';

export async function scheduleDailyNotification() {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Reminder",
            body: "Remember to log your challenges!",
        },
        trigger: {
            hour: 20,
            minute: 0,
            repeats: true,
        },
    });

    return identifier;
}

export async function askNotificationPermission() {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
                allowAnnouncements: true,
            },
        });
        scheduleDailyNotification();
        finalStatus = newStatus;
    }

    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
    }

    return true;
}

// For testing purposes
export async function scheduleImmediateNotification() {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Test Notification",
            body: "This is a test notification!",
        },
        trigger: null, // trigger immediately
    });

    return identifier;
}