import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import NewsScreen from '../screens/News/NewsScreen';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="News"
      component={NewsScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);
