import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Overlay } from "react-native-elements";
import { Audio } from "expo-av";
import { colors, device, func, gStyle, images } from '../constants';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

// header
import ModalHeader from '../components/ModalHeader';

const Store = createContext({});
// context
import Context from '../context';

const Option = ({ text }) => {
  const { hanleNext, className, loading } = React.useContext(Store);
  return (
    <TouchableOpacity
      style={[ 
        styles.option,
        text &&
          className?.text === text &&
          (className?.res ? styles.succes : styles.fail),
      ]}
      onPress={() => !loading && hanleNext(text)}
    >
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={{ fontSize: 22, color: "white" }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
const Options = ({ qes }) => {
  const [bool, setBool] = React.useState(true);
  const { setPosition } = React.useContext(Store);
  useEffect(() => {
    setBool(Math.floor(Math.random() * 3));
  }, [qes?.qs]);
  useEffect(() => {
    bool == 0
      ? setPosition([qes?.as, qes?.temp, qes?.temp2])
      : bool == 1
      ? setPosition([qes?.temp, qes?.as, qes?.temp2])
      : setPosition([qes?.temp, qes?.temp2, qes?.as]);
  }, [bool]);
  return (
    <>
      {bool == 0 ? (
        <>
          <Option text={qes?.as} />
          <Option text={qes?.temp} />
          <Option text={qes?.temp2} />
        </>
      ) : bool == 1 ? (
        <>
          <Option text={qes?.temp} />
          <Option text={qes?.as} />
          <Option text={qes?.temp2} />
        </>
      ) : (
        <>
          <Option text={qes?.temp} />
          <Option text={qes?.temp2} />
          <Option text={qes?.as} />
        </>
      )}
    </>
  );
};

export default function Game({ navigation, route }) {
  const { currentLessonData } = React.useContext(Context);
  const data = currentLessonData.data;
//   console.log(data);
//   console.log(data.transfers);
  
  const [arr, setArr] = React.useState(data.transfers);
  const [question, setQuestion] = React.useState();
  const [counter, setCounter] = React.useState(null);
  const [className, setClassName] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [position, setPosition] = React.useState([]);
  

  function addQuestion() {
    const arrQues = [].concat(data.transfers);
    const quetion = arr[Math.floor(Math.random() * arr.length)];
    setArr(arr.filter((e) => e.id !== quetion.id));
    arrQues.splice(quetion.id - 1, 1);
    const temp = arrQues[Math.floor(Math.random() * arrQues.length)];
    arrQues.splice(temp.id - 1, 1);
    let temp2 = temp;
    while (temp2.id == temp.id) {
      temp2 = arrQues[Math.floor(Math.random() * arrQues.length)];
    }
    const bool = Math.round(Math.random());
    bool
      ? setQuestion({
          checkEsAudio: false,
          qs: quetion.vi,
          as: quetion.es,
          temp: temp.es,
          temp2: temp2.es,
        }) //get Vietnamese to question
      : setQuestion({
          checkEsAudio: true,
          qs: quetion.es,
          as: quetion.vi,
          temp: temp.vi,
          temp2: temp2.vi,
        }); //get English to question
  }
  useEffect(() => {
    setCounter({ numAnswer: 0, allQues: [], current: 1, size: arr.length });
  }, []);

  useEffect(() => {
    if (counter?.current == 10) setModalVisible(true);

    if (
      counter &&
      counter.current !== 1 &&
      counter?.current === counter?.size
    ) {
      setModalVisible(true);
    } else
      setTimeout(() => {
        setLoading(false);
        addQuestion();
        setClassName(null);
      }, 1000);
    return clearTimeout();
  }, [counter]);
  const sound = new Audio.Sound();

  const handleAudio = () => {
    try {
      const word = question.checkEsAudio ? question.qs : question.as;
      console.log(question);
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then((res) => res.json())
        .then(async (arr) => {
          try {
            const { phonetics } = arr[0];
            const obj = phonetics[0];
            if (!obj.audio) {
              return;
            }
            const link = "https://" + obj.audio.substring(2);
            await sound.loadAsync({
              uri: link,
            });
            const checkLoaded = await sound.getStatusAsync();
            if (checkLoaded.isLoaded) {
              await sound.playAsync();
            } else {
              console.log("Error in Loading mp3");
            }
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //Vi tri cau
  const hanleNext = async function (rs) {
    setLoading(true);
    await handleAudio();
    if (rs === question?.as) {
      setClassName({ text: rs, res: true });
      const posYours = position.indexOf(rs);
      const posAsYours = position.indexOf(question.as);
      const ques = {
        num: counter.numAnswer + 1,
        ...question,
        posAS: posAsYours,
        yourS: posYours,
        pos: position,
      };
      const arrQues = [...counter.allQues, ques];
      setCounter((e) => {
        return {
          ...counter,
          allQues: arrQues,
          numAnswer: e?.numAnswer + 1,
          current: e?.current + 1,
        };
      });
    } else {
      setClassName({ text: rs, rss: false });
      const posYours = position.indexOf(rs);
      const posAsYours = position.indexOf(question.as);
      const ques = {
        num: counter.numAnswer + 1,
        ...question,
        posAS: posAsYours,
        yourS: posYours,
        pos: position,
      };
      const arrQues = [...counter.allQues, ques];
      setCounter((e) => {
        return {
          ...counter,
          allQues: arrQues,
          current: e?.current + 1,
        };
      });
    }
  };
//   console.log(counter);
  const onCloseModal = () => {
    const arrQ = data.transfers;
    setCounter({ numAnswer: 0, allQues: [], current: 1, size: arrQ.length });
    setArr(arrQ);
    setModalVisible(false);
  };
  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={currentLessonData.cateLesson}
      />
      <Store.Provider value={{ hanleNext, className, setPosition, loading }}>
        <View style={styles.container}>
            <Overlay isVisible={modalVisible} onBackdropPress={onCloseModal}>
            <View style={styles.viewTrans}>
                <Text style={styles.title}>Complete</Text>
                <View
                style={{
                    width: 200,
                    borderBottomColor: "#cbcaca",
                    borderBottomWidth: 1,
                    marginTop: 20,
                    marginBottom: 20,
                }}
                />
                <Text style={styles.textCount}>Grade: {counter?.numAnswer}</Text>
                <Text style={styles.textCount}>
                {counter?.numAnswer < counter?.size
                    ? "Need try harder"
                    : "Excellent"}
                </Text>

                <View style={styles.listButton}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#e7e7e7" }]}
                >
                    <Text style={{ fontSize: 22 }}>Exit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#4CAF50" }]}
                >
                    <Text style={{ fontSize: 22, color: "white" }}>Try again</Text>
                </TouchableOpacity>
                </View>
            </View>
            </Overlay>
            <View>
            <Text style={styles.title}>Vocabulary</Text>
            <Text style={styles.question}>{question?.qs}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>Answer</Text>
            </View>
            <View>
            <Options qes={question} />
            </View>
        </View>
        <View style={styles.viewCount}>
            <Text style={styles.textCount}>Grade: {counter?.numAnswer}</Text>
            <Text style={styles.textCount}>
            Question: {counter?.current}/{counter?.size}
            </Text>
        </View>
        
        </Store.Provider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 24,
    color: colors.brandPrimary,
    fontWeight: "bold",
    textAlign: "center",
  },
  question: {
    marginTop: 20,
    fontSize: 23,
    color: "white",
    textAlign: "center",
  },
  option: {
    textAlign: "center",
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
  },
  succes: {
    backgroundColor: "#32f032",
  },
  fail: {
    backgroundColor: "red",
  },
  viewCount: {
    position: "absolute",
    bottom: 0,
    borderColor: "white",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textCount: {
    textAlign: "center",
    fontSize: 22,
    color: "white"
  },
  viewTrans: {
    padding: 10,
  },
  listButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    fontSize: 22,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 130,
    padding: 5,
    textAlign: "center",
  },
});
