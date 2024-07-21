import { Image, StyleSheet, Platform, Button, View, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

interface TaskProps {
    description: string;
    title: string; 
    onComplete: () => void;
    onDelete: () => void;
}

const Task: React.FC<TaskProps> = (props) => {

    return (
      <View style={styles.taskContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Button
        onPress={props.onComplete}
        title="O"
        color='#841584'
        />
        <Button
        onPress={props.onDelete}
        title=":"
        color='#841584'
        />
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
      },
});

export default Task;
