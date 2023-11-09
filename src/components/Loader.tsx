import {ActivityIndicator, Modal, StyleSheet, View} from "react-native";
import React from "react";

export const Loader = () => {
    return (
        <Modal transparent>
            <View style={styles.indicatorWrapper}>
                <ActivityIndicator size="large" color='#003459'/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
        indicatorWrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
)