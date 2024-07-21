import { Image, StyleSheet, Platform, Button, View, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

interface TaskProps {
    description: string;
    title: string; 
}

const Task: React.FC<TaskProps> = (props) => {

    return (
      <View style={styles.taskContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      description: {
        fontSize: 16,
        fontWeight: 'bold'
      },
});

export default Task;
