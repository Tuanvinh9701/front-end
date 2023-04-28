import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// navigation
import TabNavigation from './TabNavigation';

// screens
import ModalLessonPlayer from '../screens/ModalLessonPlayer';
import ModalMoreOptions from '../screens/ModalMoreOptions';
import ModalLogIn from '../screens/Admin/ModalLogIn';
import ModalSignUp from '../screens/Admin/ModalSignUp';
import ModalGame from '../screens/ModalGame';
import EditAdmin from '../screens/Admin/EditAdmin';
import AddVocab from '../screens/Vocab/AddVocab';
import Dictionary from '../screens/Vocab/Dictionary';
import TestApi from '../screens/test/TestApi';
import HomeLearnVocab from '../screens/Vocab/HomeLearnVocab';
import ListBook from '../screens/ListBook';
import CardQuiz from '../screens/Vocab/CardQuiz';
import BuyVip from '../screens/Admin/BuyVip';
import LearnSpeaking from '../screens/Speaking/LearnSpeaking';
import TopicSpeaking from '../screens/Speaking/TopicSpeaking';
import CommentScreen from '../screens/Post/CommentScreen';
import EditPostScreen from '../screens/Post/EditPostScreen';
import ChangeCateScreen from '../screens/Post/ChangeCateScreen';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer theme={DarkTheme}>
    <Stack.Navigator
      screenOptions={{
        presentation: 'fullScreenModal'
      }}
    >
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ModalLessonPlayer"
        component={ModalLessonPlayer}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="ModalMoreOptions"
        component={ModalMoreOptions}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
          presentation: 'transparentModal'
        }}
      />

      <Stack.Screen
        name="ModalLogIn"
        component={ModalLogIn}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ModalSignUp"
        component={ModalSignUp}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ModalGame"
        component={ModalGame}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="EditAdmin"
        component={EditAdmin}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="AddVocab"
        component={AddVocab}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="TestApi"
        component={TestApi}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="HomeLearnVocab"
        component={HomeLearnVocab}
        options={{
          headerShown: false
        }}
      />

    <Stack.Screen
        name="ListBook"
        component={ListBook}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
          name="CardQuiz"
          component={CardQuiz}
          options={{
            headerShown: false
          }}
        />

    <Stack.Screen
        name="BuyVip"
        component={BuyVip}
        options={{
          headerShown: false
        }}
      />

    <Stack.Screen
        name="LearnSpeaking"
        component={LearnSpeaking}
        options={{
          headerShown: false
        }}
      />

    <Stack.Screen
        name="TopicSpeaking"
        component={TopicSpeaking}
        options={{
          headerShown: false
        }}
      />
  
    <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          headerShown: false
        }}
      />
    
    <Stack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
        options={{
          headerShown: false
        }}
      />

    <Stack.Screen
        name="ChangeCateScreen"
        component={ChangeCateScreen}
        options={{
          headerShown: false
        }}
      />
    <Stack.Screen
        name="Dictionary"
        component={Dictionary}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
