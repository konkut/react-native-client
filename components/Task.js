import React, { useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SharedTodoModalContent from './SharedTodoModalContent';
import TodoModalContent from './TodoModalContent';

const CheckMark = ({ id, completed, toggleTodo }) => {
  const toggle = async () => {
    try {
      const response = await fetch(`https://react-native-server-production.up.railway.app/todos/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: !completed
        })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      toggleTodo(id, completed);
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }
  return (
    <Pressable onPress={toggle} style={[styles.checkMark, { backgroundColor: !completed ? "#e9e9ef" : "#0ea5e9" }]}></Pressable>
  )
}


const Task = ({ id, title, completed, user_id, shared_with_id, clearTodo, toggleTodo }) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const sharedBottomSheetRef = useRef(null);
  const snapPointsShared = ["50%"]

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "48%", "75%"]

  const handlePresentShared = () => {
    sharedBottomSheetRef.current?.present();
  }

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  }

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://react-native-server-production.up.railway.app/todos/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf8'
        },
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      clearTodo(id);
      //console.log(response.status);
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }

  return (
    <View>
      <TouchableOpacity onLongPress={() => setIsDeleteActive(true)} onPress={() => setIsDeleteActive(false)} activeOpacity={0.8} style={[styles.container]}>
        <View style={styles.containerTextCheckBox}>
          <CheckMark id={id} completed={completed} toggleTodo={toggleTodo}></CheckMark>
          <Text style={styles.text}>{title}</Text>
        </View>
        {
          shared_with_id ? (
            <Feather onPress={handlePresentShared} name='users' size={20} color={"#383839"}></Feather>
          ) : (
            <Feather onPress={handlePresentModal} name='share' size={20} color={"#383839"}></Feather>
          )
        }
        {
          isDeleteActive && (
            <Pressable onPress={() => deleteTodo(id)} style={styles.deleteButton}>
              <Text style={styles.mark}>x</Text>
            </Pressable>
          )
        }
        <BottomSheetModal ref={sharedBottomSheetRef} snapPoints={snapPointsShared} backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}>
          <SharedTodoModalContent id={id} title={title} shared_with_id={shared_with_id} completed={completed}></SharedTodoModalContent>
        </BottomSheetModal>
        <BottomSheetModal ref={bottomSheetModalRef} index={2} snapPoints={snapPoints} backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}>
          <TodoModalContent id={id} title={title}></TodoModalContent>
        </BottomSheetModal>
      </TouchableOpacity>
    </View >
  )
}

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383839",
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});