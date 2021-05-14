import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const AppHeader = props => {
    return(
        <SafeAreaProvider>
            <View style = { styles.textContainer }>
                <Text style = { styles.title }>
                    Barter
                </Text>
            </View>
            <View>
                <Header
                    leftComponent = {
                        <Icon
                            name = 'arrow-left'
                            type = 'font-awesome'
                            color = '#696969'
                            onPress = {() => {
                                props.navigation.toggleDrawer();
                            }} />
                    }
                    centerComponent = {{
                        text: props.title,
                        style: {
                            color: '#ff8a65',
                            padding: 5,
                            fontSize: 30,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }
                    }}
                    backgroundColor = '#ffe0b2' />
            </View>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#ffe0b2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 60,
        fontWeight: 300,
        fontFamily: "AvenirNext-Heavy",
        color: "#ff9800",
    },
});