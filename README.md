# chapterOne

App Requirements:
- Add Task: Users can add a new task with a brief description.
- Mark Task as Complete: Users can mark tasks as complete, which visually distinguishes them from incomplete tasks.
- Delete Task: Users can delete a task from the list.
- Task List: Display all tasks in a list view, showing both complete and incomplete tasks.  

## App Setup 
These are the dependencies that might need to be installed: 

```
sudo npm install -g create-expo-app  
npm install expo-cli

npm install react-native-modal
npm install react-native-vector-icons
```

In order to run the app use 


```
cd my-app
npm run ios 
```

## App Overview 

Features: 
- There are two sections - uncompleted and completed tasks.  
- There is a create task button at the top that when clicked, prompts the user to give the name of the task and a short description (which can be optional). 
- Tasks are automatically saved to the uncompleted sections, but when the checkmark is clicked and the task is marked as completed, it will be moved to the completed section. 
- The trash button can be used to delete a task. 
- When a task is clicked on, its name and and description can be edited. 
