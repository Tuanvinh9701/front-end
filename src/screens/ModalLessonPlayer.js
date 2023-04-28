import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Overlay } from "react-native-elements";
import { colors, device, func, gStyle, images } from '../constants';
import { Ionicons } from "react-native-vector-icons";
import { Audio } from "expo-av";
import { createAPIEndpoint, BASE_URL } from '../api'

// components
import ModalHeader from '../components/ModalHeader';

// context
import Context from '../context';

const TextEng = ({ text, handleShowModal, topic }) => {
  const index = text.indexOf("(");
  if (index !== -1) {
    const number = Number.parseInt(text.substring(index + 1));
    const result = topic.transfers.find((obj) => obj.id == number);
    return (
      <Text
        style={[styles.content_text, styles.textEng]}
        onPress={() => handleShowModal(result)}
      >
        {result?.es + " "}
      </Text>
    );
  } else {
    const regex = /\d+/;
    if (regex.exec(text)) {
      const number = Number.parseInt(text.match(regex)[0]);
      const result = topic.transfers.find((obj) => obj.id == number);
      return (
        <Text
          style={[styles.content_text, styles.textEng]}
          onPress={() => handleShowModal(result)}
        >
          {result?.es + " "}
        </Text>
      );
    }
  }
  return <Text>{text + " "}</Text>;
};

const onSaveWord = (textTrans_vi, textTrans_es, user_id) => {
  const vocab_user = {
    user_id: user_id,
    vi: textTrans_vi,
    es: textTrans_es,
  };
  console.log(vocab_user);
  axios.post(BASE_URL + `/user_add_vocab`,  {vocab_user} )
    .then(res => {
      if (res.data.status === 200) {
        Alert.alert("Save succesful", textTrans_vi +" : "+ textTrans_es);
      }
    })
};

const ModalLessonPlayer = (props) => {
  // get main app state
  const { currentLessonData, user_id } = React.useContext(Context);

  const data = currentLessonData.data;
  // local state
  const [favorited, setFavorited] = React.useState(false);
  const [paused, setPaused] = React.useState(true);

  const { navigation } = props;

  const [textTrans, setTextTrans] = React.useState({});
  const [topic, setTopic] = React.useState(null);
  const [fecthing, setFecthing] = React.useState(false);

  // ui state
  const favoriteColor = favorited ? colors.brandPrimary : colors.white;
  const favoriteIcon = favorited ? 'heart' : 'heart-o';
  const iconPlay = paused ? 'play-circle' : 'pause-circle';
  const timePast = func.formatTime(0);
  const timeLeft = func.formatTime(currentLessonData.length);

  React.useEffect(() => {
    const { id } = data;
    setTopic(data);
  }, []);

  const handleShowModal = (objText) => {
    setModalVisible(true);
    // console.log(objText);
    setTextTrans(objText);
    setFecthing(true);
    try {
      //de11f79466cfb16683c1810e0b9ff27c7313fc54
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + objText.es)
        .then((res) => res.json())
        .then((arr) => {
          try {
            const { phonetics } = arr[0];
            const obj = phonetics[0];
            setTextTrans({ ...objText, ...obj });
            setFecthing(false);
          } catch (error) {
            console.log(error);
            setTextTrans(objText);
            setFecthing(false);
          }
        });
    } catch (error) { }
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  // const sound = new Audio.Sound();
  
  const [sound, setSound] = React.useState();
  const handleAudio = async (vocab) => {
    console.log('Loading Sound');
    // const url = '../assets/audios/' + vocab + '.mp3';
    const { sound } = await Audio.Sound.createAsync( require('../assets/audios/' + 'decide' + '.mp3') );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  };

  React.useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setTextTrans({});
  };

  const onGame = () => navigation.navigate("ModalGame");
  

  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={currentLessonData.cateLesson}
      />

      <View style={gStyle.p3}>
        {/* <View style={styles.layer_content}>
          <Text style={styles.text_content}>{currentLessonData.content}</Text>
        </View> */}


        <ScrollView>
          <View style={styles.container_content}>
            <Overlay isVisible={modalVisible} onBackdropPress={handleCloseModal}>
              <View>
                <Text>
                  <View style={styles.flexCenter}>
                    {fecthing ? (
                      <ActivityIndicator size="large" color="#4F8EF7" />
                    ) : (
                      <Ionicons
                        name="volume-high-outline"
                        size={40}
                        color="#4F8EF7"
                        style={styles.flexCenter}
                        onPress={() => handleAudio(textTrans.es)}
                      />
                    )}

                    <Text style={styles.textShow}>{textTrans.es}</Text>
                    {!fecthing && (
                      <Text style={styles.textShow}>{textTrans.text}</Text>
                    )}
                    <View
                      style={{
                        width: 200,
                        borderBottomColor: "#cbcaca",
                        borderBottomWidth: 1,
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    />
                    <Text style={styles.textShow}>{textTrans.vi}</Text>
                    <TouchableOpacity style={styles.saveWord} onPress={() => onSaveWord(textTrans.vi, textTrans.es, user_id)}>
                      <Ionicons name="save" size={20} color="#fff">
                        <Text>Save</Text>
                      </Ionicons>
                    </TouchableOpacity>
                  </View>
                </Text>
              </View>
            </Overlay>
            <View style={styles.content}>
              {topic && (
                <>
                  <Text style={styles.textBig}>{topic.title.split(":")[0]}</Text>
                  <Text style={[styles.textBig]}>
                    {topic.title.split(":")[1]}
                  </Text>
                  <Text style={styles.author}>Author: {currentLessonData.author}</Text>
                  <Text style={styles.badgeContainer}>
                    {topic.content.split(" ").map((text, key) => (
                      <TextEng
                        text={text}
                        key={key}
                        handleShowModal={handleShowModal}
                        topic={topic}
                      />
                    ))}
                  </Text>
                </>
              )}
            </View>
            {/* <View style={styles.layer_content}>
          <Text style={styles.text_content}>{currentLessonData.content}</Text>
        </View> */}
          </View>
          <TouchableOpacity style={styles.viewGame} onPress={onGame}>
            <Ionicons name="game-controller-outline" size={30} color="#fff">
              <Text style={{ marginLeft: 20 }}>play game</Text>
            </Ionicons>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

ModalLessonPlayer.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  
  containerDetails: {
    marginBottom: 16,
  },
  containerLesson: {
    flex: 6
  },
  lesson: {
    ...gStyle.textGroup7Bold24,
    color: colors.white
  },
  author: {
    ...gStyle.textGroup718,
    color: colors.greyInactive,
    textAlign: "center"
  },
  containerFavorite: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  containerTime: {
    ...gStyle.flexRowSpace
  },
  time: {
    ...gStyle.textGroup710,
    color: colors.greyInactive
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container_content: {
    overflow: "scroll",
    position: "relative",
  },
  textBig: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.brandPrimary,
  },
  content: {
    padding: 1,
    // height: device.height / 1.8,
  },
  content_text: {
    width: "100%",
    textAlign: "auto",
    lineHeight: 30,
    overflow: "scroll",
  },
  badgeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 17,
    color: "white",
  },
  textEng: {
    color: "orange",
    fontWeight: "bold",
  },
  hiddenTrans: {
    bottom: -100,
  },
  viewTrans: {
    padding: 20,
  },
  textTrans: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 100,
  },
  textShow: {
    fontSize: 22,
    textTransform: "capitalize",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  saveWord: {
    backgroundColor: colors.brandPrimary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 5,
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  viewGame: {
    flex: 1,
    backgroundColor: colors.brandPrimary,
    fontSize: 15,
    padding: 5,
    display: "flex",
    alignItems: "center",
  },
});

export default ModalLessonPlayer;
