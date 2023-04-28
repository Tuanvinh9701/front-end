import * as React from 'react';
import { FlatList, StyleSheet, View , Linking, Text, Pressable, Image} from 'react-native';
import { colors, device, gStyle, images } from '../constants';
// components
import LineItemCategory from '../components/LineItemCategory';
import ScreenHeader from '../components/ScreenHeader';

// mock data
import yourPerson from '../mockdata/menuYourPerson.json';

import { useNavigation } from '@react-navigation/native';
// context
import Context from '../context';

const Person = () => {
  const navigation = useNavigation();
  // get main app state
  const { full_name, username } = React.useContext(Context);
  console.log(full_name.split(" ").pop()[0]);
  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Learning English" />
      </View>
      <View style={styles.header}>
        {/* <View style={styles.avt}>
          <Text style={styles.headerText}>{full_name.split(" ").pop()[0]}</Text>
        </View> */}
        <Image style={styles.avt} source={images["avt"]} />
        <View style={styles.info}>
          <Text style={styles.headerTextLarge}>{full_name}</Text>
          <Text style={styles.headerSmall}>{username}</Text>
        </View>
      </View>
      <Pressable style={styles.vip} onPress={() => {navigation.navigate("BuyVip")}}><Text style={styles.headerText}>BUY VIP</Text></Pressable>
      <View style={styles.line}></View>
      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={yourPerson}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => {
        if (item.title === "Contact support") {
            return (
              <LineItemCategory
                icon={item.icon}
                onPress={() => Linking.openURL(`tel: 662-715-0828`)}
                title={item.title}
              />
            )
        } else if (item.title === "Rate") {
          return (
            <LineItemCategory
              icon={item.icon}
              onPress={() => Linking.openURL('https://apps.apple.com/au/app/h%E1%BB%8Dc-ti%E1%BA%BFng-anh-ielts-song-ng%E1%BB%AF/id1491650549')}
              title={item.title}
            />
          )
      } else {
        return (
          <LineItemCategory
            icon={item.icon}
            onPress={() => navigation.navigate(item.slug, { id: 1 })}
            title={item.title}
          />
        )
      }
        } }
      />
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 155,
    paddingTop: device.iPhoneNotch ? 100 : 80,
    paddingLeft: 10,
    marginBottom: 5,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  vip: {
    marginLeft: '38%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 95,
    backgroundColor: '#072F92',
    borderRadius: 10,
  },
  line: {
    borderBottomColor: colors.greyOff,
    borderBottomWidth: 1,
  },
  avt: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderColor: colors.greyOff,
    borderWidth: 3,
  },
  headerTextLarge: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  headerSmall: {
    color: '#fff',
    fontSize: 14,
  },  
  headerText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },  
  
  containerHeader: {
    position: 'absolute',
    top: 30,
    width: '100%',
    zIndex: 10
  },
  containerFlatlist: {
    // marginTop: device.iPhoneNotch ? 88 : 64
  }
});

export default Person;
