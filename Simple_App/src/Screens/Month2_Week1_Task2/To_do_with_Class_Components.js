// TodoList.js
import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '', // Holds the current task input value
      tasks: [] // Holds the list of tasks
    };
  }

  // Function to handle input change
  handleInputChange = (task) => {
    this.setState({ task });
  };

  // Function to add task to the list
  addTask = () => {
    if (this.state.task.trim() === '') {
      return; // Don't add empty tasks
    }
    const newTask = { id: Date.now().toString(), text: this.state.task };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      task: '' // Clear input field after adding task
    }));
  };

  // Function to delete a task from the list
  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id)
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={this.state.task}
          onChangeText={this.handleInputChange} // Updates the task input
        />

        <Button title="Add Task" onPress={this.addTask} />

        <FlatList
          data={this.state.tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item.text}</Text>
              <TouchableOpacity onPress={() => this.deleteTask(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

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
    fontSize: 15,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation: 2.5,
    padding: 10,
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
