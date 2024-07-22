import { Image, StyleSheet, Platform, Button, View, Text, ScrollView , TouchableOpacity} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

interface TaskProps {
    description: string;
    title: string; 
    onComplete: () => void;
    onDelete: () => void;
    done: boolean; 
}

const Task: React.FC<TaskProps> = (props) => {

    return (
      <View style={styles.taskContainer}>
        {props.done ? (
        <TouchableOpacity onPress={props.onComplete}>
        <Icon name="checkcircle" size={20} color="black" />
        </TouchableOpacity>
        ) : ( 
        <TouchableOpacity onPress={props.onComplete}>
        <Icon name="checkcircleo" size={20} color="black" />
        </TouchableOpacity>
        )}
        <View style={styles.text}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
        </View>
       <TouchableOpacity onPress={props.onDelete} style={styles.delete}>
        <Icon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',  
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      description: {
        fontSize: 16,
      },
      text: {
        marginLeft: 10, 
        marginRight: 10, 
      },
      delete: {
        position: 'absolute',
        right: 10, 
        top: '50%', 
        transform: [{ translateY: -10 }],
      }
});

export default Task;
