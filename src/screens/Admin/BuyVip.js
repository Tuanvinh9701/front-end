import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import ModalHeader from '../../components/ModalHeader';

const BuyVip = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={"BUY VIP LESSON"}
      />
      <React.Fragment>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          style={gStyle.container}
        >
          <View style={gStyle.spacer3} />
          <View style={styles.containerSearchBar}>
          </View>
          <View style={styles.listStyle}>
            <LinearGradient colors={['#93C6F9', '#97B4FA', '#A768FE']}
                            start={[0, 0]}
                            end={[1, 1]}
                            location={[0.25, 0.4, 1]} 
                            style={styles.listItem}>

              <Text style={styles.textVip}>PACKAGE VIP/Magazine 1 year ($100)</Text>
              <Text style={styles.textVipSmall}>PACKAGE VIP/Magazine 1 year ($100)</Text>
            </LinearGradient>
            <LinearGradient colors={['#93C6F9', '#97B4FA', '#A768FE']}
                            start={[0, 0]}
                            end={[1, 1]}
                            location={[0.25, 0.4, 1]} 
                            style={styles.listItem}>

              <Text style={styles.textVip}>PACKAGE VIP/Magazine 1 year ($100)</Text>
              <Text style={styles.textVipSmall}>PACKAGE VIP/Magazine 1 year ($100)</Text>
            </LinearGradient>
            <LinearGradient colors={['#93C6F9', '#97B4FA', '#A768FE']}
                            start={[0, 0]}
                            end={[1, 1]}
                            location={[0.25, 0.4, 1]} 
                            style={styles.listItem}>

              <Text style={styles.textVip}>PACKAGE VIP/Magazine 1 year ($100)</Text>
              <Text style={styles.textVipSmall}>PACKAGE VIP/Magazine 1 year ($100)</Text>
            </LinearGradient>
          </View>

        </Animated.ScrollView>
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  searchPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingVertical: 16
  },
  searchPlaceholderText: {
    ...gStyle.textGroup716,
    color: colors.blackBg
  },
  sectionHeading: {
    ...gStyle.textGroup7Bold18,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 16
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  containerColumn: {
    width: '30%'
  },
  listStyle: {
    padding: 10
  },
  listItem: {
    padding: 20,
    paddingLeft: 30,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderColor: colors.white,
    borderWidth: 4,
    marginBottom: 20
  },
  textVip: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textVipSmall: {
    color: 'yellow',
    fontSize: 14,
  }
});

export default BuyVip;
