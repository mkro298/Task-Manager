import { Image, StyleSheet, Platform, Button, TextInput, TouchableOpacity  } from 'react-native';
import { View, Text, ScrollView} from 'react-native';
import { useState } from 'react';
import Task from '../components/task';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Array<{ description: string; title: string }>>([]);
  const [completedTasks, setCompletedTasks] = useState<Array<{ description: string; title: string }>>([]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleDelete = (index: number) => {
    const taskToDelete = tasks[index]; 
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const handleCDelete = (index: number) => {
    const taskToDelete = completedTasks[index]; 
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  }

  const handleCompleteTask = (index: number) => {
    const taskToComplete = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const handleUncompleteTask = (index: number) => {
    const taskToComplete = completedTasks[index];
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    setTasks([...tasks, taskToComplete]);
  };

  const makeTask = () => {
    if (newTaskTitle != '' || newTaskDescription != '') {
      const newTask = { description: newTaskDescription, title: newTaskTitle };
      setTasks([...tasks, newTask]);
    }
    setIsAddingTask(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Tasks</Text>
      {isAddingTask ? (
      <Modal isVisible={true}>
        <View style={styles.modalContainer}>
          <TextInput
          placeholder='Task'
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          style={styles.input}
          />
          <TextInput
          placeholder='Description'
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          style={styles.input}
          />
          <Button
            onPress={makeTask}
            title='Save Task'
          />
        </View>
      </Modal>
    
      ) : (
        <TouchableOpacity onPress={handleAddTask} style={styles.createButton}>
          <Icon name="pluscircleo" size={20} color="black" />
          <Text style={styles.buttonText}>Create New Task</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.tasks}>Tasks</Text>
      <ScrollView>
        {tasks.map((task, index) => (
          <Task 
            key={index}
            description={task.description}
            title={task.title}
            onComplete={() => handleCompleteTask(index)}
            onDelete={() => handleDelete(index)}
            done={false}
          />
        ))}
      </ScrollView>
      <Text style={styles.completedtasks}>Completed Tasks</Text>
      <ScrollView>
        {completedTasks.map((task, index) => (
          <Task 
            key={index}
            description={task.description}
            title={task.title}
            onComplete={() => handleUncompleteTask(index)}
            onDelete={() => handleCDelete(index)}
            done={true}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    marginLeft: 30,
    marginTop: 70,
  },
  input: {
    height: 50,
    borderColor: 'transparent',
    marginBottom: 10,
    padding: 10,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6fa',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20,
    width: 300, 
    marginLeft: 35, 
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  tasks: {
    marginLeft: 30, 
    fontSize: 16, 
  }, 
  completedtasks: {
    marginLeft: 30, 
    fontSize: 16, 
  }, 
  scrollView: {
  },
});
