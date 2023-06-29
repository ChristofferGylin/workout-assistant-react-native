import * as React from 'react';

import { Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ExerciseDetailsScreen from './screens/ExerciseDetailsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HistoryScreen from './screens/HistoryScreen';
import SettingsMenu from './components/SettingsMenu';
import { ContextProvider } from './Context';
import Exercises from './screens/Exercises';
import NewExerciseScreen from './screens/NewExerciseScreen';
import Sessions from './screens/Sessions';
import SessionDetailsScreen from './screens/SessionDetailsScreen';
import NewSessionScreen from './screens/NewSessionScreen';
import Schedule from './screens/Schedule';
import SessionDetailsScheduleScreen from './screens/SessionDetailsScheduleScreen';
import AddExercise from './screens/AddExercise';
import ConFirmAddExercise from './screens/ConfirmAddExercise';
import NextSessionDetailsScreen from './screens/NextSessionDetailsScreen';
import WorkoutReady from './screens/WorkoutReady';
import WorkoutActive from './screens/WorkoutActive';
import WorkoutResults from './screens/WorkoutResults';
import WorkoutReps from './screens/WorkoutReps';
import WorkoutPause from './screens/WorkoutPause';
import SessionDetailsHistoryScreen from './screens/SessionDetailsHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Group screenOptions={({ navigation, route }) => ({ headerShown: false })}>
            <Stack.Screen
              name='Home'
              component={HomeScreen}

            />
            <Stack.Screen
              name='Exercises'
              component={Exercises}

            />
            <Stack.Screen
              name='Sessions'
              component={Sessions}

            />
            <Stack.Screen
              name='Schedule'
              component={Schedule}

            />
            <Stack.Screen
              name='History'
              component={HistoryScreen}
            />
            <Stack.Screen
              name='WorkoutReady'
              component={WorkoutReady}
            />
            <Stack.Screen
              name='WorkoutActive'
              component={WorkoutActive}
            />
            <Stack.Screen
              name='WorkoutPause'
              component={WorkoutPause}
            />
            <Stack.Screen
              name='WorkoutReps'
              component={WorkoutReps}
            />
            <Stack.Screen
              name='WorkoutResults'
              component={WorkoutResults}
            />


          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name='NewExercise'
              component={NewExerciseScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    title='Done' />
                ),
                headerLeft: () => (
                  <Button
                    title='Cancel'
                    onPress={() => navigation.navigate('Exercises')} />
                ),
                title: 'New exercise',
              })}
            />

            <Stack.Screen
              name='NewSession'
              component={NewSessionScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    title='Done' />
                ),
                headerLeft: () => (
                  <Button
                    title='Cancel'
                    onPress={() => navigation.navigate('Sessions')} />
                ),
                title: 'New session',
              })}
            />
            <Stack.Screen
              name='ExerciseDetails'
              component={ExerciseDetailsScreen}
              options={({ navigation, route }) => ({
                title: route.params.title,
                headerLeft: () => {

                  return (
                    <Button
                      title='Close'
                      onPress={() => { navigation.navigate('Exercises') }}
                    />
                  )

                },

              })}
            />

            <Stack.Screen
              name='SessionDetails'
              component={SessionDetailsScreen}
              options={({ navigation, route }) => ({
                title: route.params.title,
                headerLeft: () => {

                  return (
                    <Button
                      title='Close'
                      onPress={() => {
                        navigation.goBack();
                        navigation.navigate('Sessions')
                      }}
                    />
                  )

                },

              })}
            />
            <Stack.Screen
              name='SessionDetailsHistory'
              component={SessionDetailsHistoryScreen}
              options={({ navigation, route }) => ({
                title: route.params.title,
                headerLeft: () => {

                  return (
                    <Button
                      title='Close'
                      onPress={() => {
                        navigation.goBack();

                      }}
                    />
                  )

                },

              })}
            />
            <Stack.Screen
              name='NextSessionDetails'
              component={NextSessionDetailsScreen}
              options={({ navigation, route }) => ({
                title: route.params.title,
                headerLeft: () => {

                  return (
                    <Button
                      title='Close'
                      onPress={() => {
                        navigation.goBack();

                      }}
                    />
                  )

                },

              })}
            />

            <Stack.Screen
              name='SessionDetailsSchedule'
              component={SessionDetailsScheduleScreen}
              options={({ navigation, route }) => ({
                title: route.params.title,
                headerLeft: () => {

                  return (
                    <Button
                      title='Close'
                      onPress={() => { navigation.navigate('Schedule') }}
                    />
                  )

                },

              })}
            />

            <Stack.Screen
              name='AddExercise'
              component={AddExercise}
              options={({ navigation, route }) => ({
                title: 'Add exercise to session',
                headerLeft: () => {

                  return (
                    <Button
                      title='Cancel'
                      onPress={() => { navigation.navigate('Exercises') }}
                    />
                  )

                },

              })}
            />

            <Stack.Screen
              name='ConfirmAddExercise'
              component={ConFirmAddExercise}
              options={({ navigation, route }) => ({
                title: 'Confirm',
                headerLeft: () => {

                  return (
                    <Button
                      title='Cancel'
                      onPress={() => { navigation.navigate('Exercises') }}
                    />
                  )

                },

              })}
            />

          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}



