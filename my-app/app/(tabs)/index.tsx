import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, ScrollView} from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [tasks, setTasks] = useState(['']); 
  const [completed, setCompleted] = useState(['']); 

  const makeTask = () => {
    const task = "hi" 
    setTasks([...tasks, task]); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Tasks</Text>
      <Button
        onPress={makeTask}
        title="Create New Task"
        color='#841584'
      />
      <ScrollView>
      { tasks?.map(function (item, index) { return ( 
              <Text key={index} >
               {item}
              </Text> 
              )})
            }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#e2eff6',
  },
  text: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    marginLeft: 60, 
    marginTop: 70, 
    position: 'static', 
  },
});
