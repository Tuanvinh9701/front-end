import React, { Component } from 'react';
import { Image, StyleSheet, View, ScrollView, Linking, Text, Pressable } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { colors, device, gStyle } from '../../constants';
// components
import ScreenHeader from '../../components/ScreenHeader';

import TouchIcon from '../../components/TouchIcon';


export default class NewsScreen extends Component {
    state = {
        articles: [],
        isLoading: true,
        errors: null
    };

    getArticles() {
        axios
            .get(
                "http://172.20.10.2:5000/get_news"
            )
            .then(response =>
                response.data.map(article => ({
                    title: `${article.title}`,
                    url: `${article.url}`,
                    description: `${article.description}`,
                    urlToImage: `${article.urlToImage}`,
                }))
            )
            .then(articles => {
                this.setState({
                    articles,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getArticles();
    }

    render() {
        const { isLoading, articles } = this.state;
        return (
            <View style={gStyle.container}>
                <View style={styles.containerHeader}>
                    <ScreenHeader title="Latest news" />
                </View>
                <View style={styles.pass}></View>
                <ScrollView>
                    {!isLoading ? (
                        articles.map(article => {
                            const { title, url, description, urlToImage } = article;
                            // console.log(data, title, url, )
                            return (
                                <View style={styles.box}>
                                    <Pressable onPress={()=>{Linking.openURL(`${url}`)}}>
                                        <View style={{ flexDirection: 'row', padding: 5 }}>
                                            <View style={{ justifyContent: 'space-around', flex: 2 / 3, margin: 10 }}>
                                                <Text style={styles.title}>{title}</Text>
                                                <Text style={styles.description}>{description}</Text>
                                            </View>
                                            <View style={{ flex: 1 / 3, margin: 10 }}>
                                                <Image style={{ width: 110, height: 85 }} source={{ uri: urlToImage }} />
                                            </View>
                                        </View>
                                    </Pressable>
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <View style={{ justifyContent: 'space-around', flex: 2 / 3, margin: 10 }}>
                                            <Text style={styles.date}>Date: 15/11/2022</Text>
                                        </View>
                                        <View style={{ flex: 1 / 3, margin: 10 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchIcon
                                                    icon={<FontAwesome color={colors.white} name={"heart-o"} />}
                                                />
                                                <Pressable onPress={()=>{Linking.openURL('https:facebook.com')}}>
                                                    <TouchIcon
                                                        icon={<FontAwesome color={colors.white} name={"share"} />}
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <Text style={styles.title}>Loading...</Text>
                    )}
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    containerHeader: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10
    },
    containerFlatlist: {
        marginTop: device.iPhoneNotch ? 88 : 64
    },
    box: {
        borderBottomColor: colors.greyLight,
        borderBottomWidth: 1,
        borderRadius:5
    },
    pass: {
        marginTop: 88
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        height: 100
    },
    description: {
        color: "#cccccc",
        height: 15
    },
    date: {
        color: "#cccccc",
    }
});
