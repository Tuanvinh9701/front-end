import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { func } from './src/constants';  //  function constants
import * as SplashScreen from 'expo-splash-screen';   // <-- Create start screen

// root stack navigation
import RootStack from './src/navigation/RootStack';

// app context state
import AppState from './src/context/AppState';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  // Effect Hook: component lifecycle management
  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();  // <-- Create start screen

        // load images, fonts, etc.
        // await func
        await func.loadAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false)
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);
  if (isLoading) {
    return null;
  }

  return (
    <AppState>
      <StatusBar barStyle="light-content" />

      <RootStack />
    </AppState>
  );
};

export default App;