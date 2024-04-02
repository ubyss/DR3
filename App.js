// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Importação necessária

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Importação de telas
import HomeScreen from './src/screens/HomeScreen';
import EventsScreen from './src/screens/EventsScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import HotelsScreen from './src/screens/HotelsScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import CameraScreen from './src/screens/CameraScreen';

// Criação dos Navegadores
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Criação do Stack Navigator

const GalleryTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Gallery') {
            iconName = focused ? 'photo-library' : 'photo-library';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera-alt' : 'camera-alt';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#EF233C',
        tabBarInactiveTintColor: '#8D99AE',
      })}
    >
      <BottomTab.Screen name="Gallery" component={GalleryScreen} />
      <BottomTab.Screen name="Camera" component={CameraScreen} />
    </BottomTab.Navigator>
  );
};

function DetailsAndHotelsTabs({ route }) {
  const { eventId } = route.params;

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Details') {
            iconName = focused ? 'info' : 'info-outline';
          } else if (route.name === 'Hotels') {
            iconName = focused ? 'hotel' : 'hotel';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="Details" component={EventDetailsScreen} initialParams={{ eventId }} />
      <BottomTab.Screen name="Hotels" component={HotelsScreen} initialParams={{ eventId }} />
    </BottomTab.Navigator>
  );
}



// Stack Navigator para os eventos
function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="EventDetails" component={DetailsAndHotelsTabs} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8D99AE',
          },
          headerTintColor: '#2B2D42',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Lista de Eventos" component={EventsStack} />
        <Drawer.Screen name="Adicionar novo evento" component={AddEventScreen} />
        <Drawer.Screen name="Galeria" component={GalleryTabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
