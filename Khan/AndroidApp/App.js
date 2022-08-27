import React,{useState} from "react";
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry} from '@ui-kitten/components';
import AppNavigator from './src/Navigators/app.navigator';
import { default as theme } from './src/assets/theme/custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './src/assets/theme/theme-context';
import { Platform, SafeAreaView } from 'react-native';
import { useStyleSheet ,StyleService} from '@ui-kitten/components';
import { enableScreens } from 'react-native-screens';
import PushNotication from "./src/screens/notification/pushNotication";
import Apps from "./src/screens/status/Apps";


export default function App() {
    const [themeDefault, setTheme] = useState('dark');
    const styles = useStyleSheet(mainStyle);
    const toggleTheme = () => {
      const nextTheme = themeDefault === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    };

    enableScreens();

   return(
     <>
    {/* <PushNotication */}
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeContext.Provider value={{ themeDefault, toggleTheme }}>
        <ApplicationProvider {...eva} theme={{ ...eva[themeDefault],theme}}>
          <SafeAreaView style={styles.droidSafeArea}>
              <AppNavigator/> 
          </SafeAreaView>
        </ApplicationProvider>
      </ThemeContext.Provider>  
      </>
    );
}
const mainStyle= StyleService.create({
  droidSafeArea: {
      flex: 1,
      backgroundColor:'#2c3e50',
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
