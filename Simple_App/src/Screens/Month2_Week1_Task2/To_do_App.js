// TodoList.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const TodoList = () => {
  const [task, setTask] = useState(''); // Holds the current task input value
  const [tasks, setTasks] = useState([]); // Holds the list of tasks

  // Function to add task to the list
  const addTask = () => {
    if (task.trim() === '') {
      return; // Don't add empty tasks
    }
    setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    setTask(''); // Clear input field after adding task
  };

  // Function to delete a task from the list
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask} // Updates the task input
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 3,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize:15
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation:2.5,
    padding:10
  },
  taskText: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
});

export default TodoList;
