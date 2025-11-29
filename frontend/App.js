import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Splash/SplashScreen.jsx';
import TabNavigator from './src/navigation/TabNavigator';
import CreateDonationForm from './src/screens/Donate/CreateDonationForm.jsx';

// Configure the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1ABC9C', // Teal
    accent: '#16A085', // Green-Blue
    background: '#FFFFFF', // White
    surface: '#FFFFFF', // White
    text: '#0E0E0E', // Rich Black
    error: '#f44336',
    disabled: '#CCCCCC', // Gray
    placeholder: '#CCCCCC', // Gray
    // Custom colors
    secondary: '#2980B9', // Royal Blue
    softBlue: '#AEDFF7',
    richBlack: '#0E0E0E',
    gray: '#CCCCCC',
  },
  roundness: 8,
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="CreateDonationForm" component={CreateDonationForm} />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
