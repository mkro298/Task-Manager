import { StyleSheet, Button, TextInput, TouchableOpacity  } from 'react-native';
import { View, Text, ScrollView} from 'react-native';
import { useState } from 'react';
import Task from '../components/task';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

export default function HomeScreen() {
  //maintains two seperate lists of tasks - those which are complete, and those that aren't 
  const [tasks, setTasks] = useState<Array<{ description: string; title: string }>>([]);
  const [completedTasks, setCompletedTasks] = useState<Array<{ description: string; title: string }>>([]);

  //used for checking whether a modal should be displayed or not - if we are either creating 
  //a new task or editing an old one 
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editing, setEditing] = useState(false); 

  //values to keep track of when either creating or editing a new task to pass into task object 
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [index, setIndex] = useState(0); 
  const [isComplete, setIsComplete] = useState(false); 
 
  //used when setting values to edit an uncomplete task 
  const editTask = (index: number) => {
    const taskToEdit = tasks[index]; 
    setEditing(true)
    setNewTaskTitle(taskToEdit.title)
    setNewTaskDescription(taskToEdit.description)
    setIndex(index) 
    setIsComplete(false)
  }

  //used when setting values to edit a complete task 
  const editCTask = (index: number) => {
    const taskToEdit = completedTasks[index]; 
    setEditing(true)
    setNewTaskTitle(taskToEdit.title)
    setNewTaskDescription(taskToEdit.description)
    setIndex(index) 
    setIsComplete(true)
  }

  //after we have edited the fields for a task, this saves the changes into the original task 
  //and resets values 
  const saveEditTask = (index: number, isComplete: boolean) => {
    if (isComplete) {
      const task = completedTasks[index]; 
      task.description = newTaskDescription; 
      task.title = newTaskTitle; 
    } else {
      const task = tasks[index]; 
      task.description = newTaskDescription; 
      task.title = newTaskTitle; 
    }
    setIsAddingTask(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setEditing(false)
    setIndex(0)
    setIsComplete(false)
  }
  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  //used to delete tasks based on which list it's in 
  const handleDelete = (index: number) => {
    const taskToDelete = tasks[index]; 
    setTasks(tasks.filter((_, i) => i !== index));
  }
  const handleCDelete = (index: number) => {
    const taskToDelete = completedTasks[index]; 
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  }

  //used to move task to the other list based on whether it's complete or not 
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

  //passes in entered values to create a new task as long as either task or description has been filled 
  const makeTask = () => {
    if (newTaskTitle != '' || newTaskDescription != '') {
      const newTask = { description: newTaskDescription, title: newTaskTitle };
      setTasks([...tasks, newTask]);
    }
    setIsAddingTask(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  //uses modals to edit/create task and uses states defined above to determine whether to display modals 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Tasks</Text>
        <Modal isVisible={editing}>
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
             onPress={() => saveEditTask(index, isComplete)}
              title='Save Task'
          />
        </View>
        </Modal>
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
            onEdit={() => editTask(index)}
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
            onEdit={() => editCTask(index)}
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
});
