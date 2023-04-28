import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants';

// navigation stacks
import StackLesson from './StackLesson';
import StackSearch from './StackSearch';
import StackPerson from './StackPerson';
import StackNews from './StackNews';
import StackPost from './StackPost';

// components
import CustomTabBar from '../components/CustomTabBar';

// icons
import IconsTabLesson from '../icons/Icons.TabLesson';
import IconsTabPerson from '../icons/Icons.TabPerson';
import IconsTabSearch from '../icons/Icons.TabSearch';
import IconsTabHome from '../icons/Icons.TabHome';
import IconsTabNews from '../icons/Icons.TabNews';


const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ active }) => {
        let icon = <IconsTabLesson active={active} />;

        if (route.name === 'StackSearch') {
          icon = <IconsTabSearch active={active} />;
        } else if (route.name === 'StackPerson') {
          icon = <IconsTabPerson active={active} />;
        } else if (route.name === 'StackNews') {
          icon = <IconsTabNews active={active} />;
        } else if (route.name === 'StackPost') {
          icon = <IconsTabHome active={active} />;
        }

        return icon;
      },
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.greyInactive
    })}
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen
      name="StackLesson"
      component={StackLesson}
      options={{
        tabBarLabel: 'Lessons'
      }}
    />

    <Tab.Screen
      name="StackSearch"
      component={StackSearch}
      options={{
        tabBarLabel: 'Book'
      }}
    />

    <Tab.Screen
      name="StackPost"
      component={StackPost}
      options={{
        tabBarLabel: ''
      }}
    />

    <Tab.Screen
      name="StackNews"
      component={StackNews}
      options={{
        tabBarLabel: 'News'
      }}
    />

    <Tab.Screen
      name="StackPerson"
      component={StackPerson}
      options={{
        tabBarLabel: 'Person'
      }}
    />
  </Tab.Navigator>
);
