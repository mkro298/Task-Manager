import { Image, StyleSheet, Platform, Button, TextInput } from 'react-native';
import { View, Text, ScrollView} from 'react-native';
import { useState } from 'react';
import Task from '../components/task';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Array<{ description: string; title: string }>>([]);
  const [completedTasks, setCompletedTasks] = useState<JSX.Element[]>([]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    setIsAddingTask(true);
  };


  const makeTask = () => {
    const newTask = { description: newTaskDescription, title: newTaskTitle };
    setTasks([...tasks, newTask]);
    setIsAddingTask(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Tasks</Text>
      {isAddingTask ? (
        <View>
          <TextInput
          placeholder='Title'
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          />
          <TextInput
          placeholder='Description'
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          />
          <Button
            onPress={makeTask}
            title='Save Task'
          />
        </View>
      ) : (
        <Button
        onPress={handleAddTask}
        title="Create New Task"
        color='#841584'
      />
      )}
      <ScrollView>
      {tasks.map((task, index) => (
          <Task 
            key={index}
            description={task.description}
            title={task.title}
          />
        ))}
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
