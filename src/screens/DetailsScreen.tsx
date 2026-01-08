import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function DetailsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Enter your details</Text>

                <Input label="Name" placeholder="e.g. John Doe" />
                <Input label="Email" placeholder="e.g. email@example.com" />

                <Text style={styles.sectionTitle}>Address</Text>
                <Input label="Address Line 1" placeholder="Street address" />
                <Input label="Address Line 2 (Optional)" placeholder="Apartment, suite, etc." />

                <Input label="Pin Code" placeholder="City Zip Code" keyboardType="number-pad" />

                <Button title="Next" onPress={() => { }} style={styles.button} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SIZES.padding,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: 24,
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        color: COLORS.text,
        fontFamily: FONTS.medium,
        marginTop: 16,
        marginBottom: 16
    },
    button: {
        marginTop: 24,
    }
});
