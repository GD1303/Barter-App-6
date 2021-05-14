import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';

import db from '../Config';
import { AppHeader } from '../components/AppHeader';

export default class MyBarterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allBarters: [],
        };
        this.requestRef = null;
    }

    getAllBarters = () => {
        this.requestRef = db.collection('barters').where('donor_id', '==', this.state.userId)
        .onSnapshot(snapshot => {
            var allBarters = snapshot.docs.map(
                document => document.data()
            );
            this.setState({
                allBarters: allBarters,
            });
        });
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, i }) => {
        return(
            <ListItem
                key = { i }
                bottomDivider>
                <Icon 
                    name = "shoppingcart"
                    type = "ant-design"
                    color = '#696969' />
                <ListItem.Title style = {{ color: 'black', fontWeight: 'bold' }}>
                    { item.item_name }
                </ListItem.Title>
                <ListItem.Subtitle>
                    { "Requested By: " + item.requested_by +"\nStatus : " + item.request_status }
                </ListItem.Subtitle>
                <TouchableOpacity style = { styles.button }>
                    <Text style = {{ color: "#ff5722", fontSize: 18, fontWeight: '300', padding: 20 }}>
                        Exchange
                    </Text>
                </TouchableOpacity>
            </ListItem>
        )
    }

    componentDidMount() {
        this.getAllBarters();
    }

    componentWillUnmount() {
        this.requestRef();
    }

    render() {
        return(
            <View style = {{ flex: 1, backgroundColor: '#ffe0b2' }}>
                <AppHeader title = 'My Barters' navigation = { this.props.navigation } />
                <View style = { styles.container }>
                    {
                        this.state.allBarters.length === 0
                        ? (
                            <View style = {{
                                flex: 1,
                                fontSize: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style = {{ fontSize: 20 }}>
                                    List of all Barters
                                </Text>
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor = { this.keyExtractor }
                                data = { this.state.allBarters }
                                renderItem = { this.renderItem } />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe0b2',
        alignItems: 'center',
        marginTop: -300,
    },
    button: {
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        elevation: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ff5722',
    },
});