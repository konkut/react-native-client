import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputTask from './components/InputTask';

export default function App() {

  const [todos, setTodo] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('https://react-native-server-production.up.railway.app/todos/1');
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setTodo(data)
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }

  const clearTodo = (id) => {
    setTodo(todos.filter(row => row.id !== id));
  }
  const toggleTodo = (id, completed) => {
    setTodo(todos.map(row =>
      (row.id === id) ? { ...row, completed: !completed } : row
    ));
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={todos}
            keyExtractor={(todo) => todo.id}
            renderItem={({ item }) => <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo}></Task>}
            ListHeaderComponent={() => <Text style={styles.title} >Hoy</Text>}
            contentContainerStyle={styles.contentContainerStyle}
          ></FlatList>
          <InputTask todos={todos} setTodos={setTodo}></InputTask>
        </SafeAreaView>
        {/*JSON.stringify(todos, null, 2)*/}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
