import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SharedTodoModalContent = ({ id, title, shared_with_id, completed }) => {
  const [author, setAuthor] = useState({})
  const [sharedWith, setSharedWith] = useState({})

  useEffect(() => {
    fetchInfo();
  }, [])

  /* OBTIENE AUTOR Y USUARIO MEDIANTE LOS ID DE LA TABLA SHARED_TODOS*/
  const fetchInfo = async () => {
    try {
      const response = await fetch(`https://react-native-server-production.up.railway.app/todos/shared_todos/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const { author, shared_with_user } = await response.json();
      setAuthor(author);
      setSharedWith(shared_with_user);

    } catch (error) {
      console.error('Ocurrió un error:', error);
    }

  }

  return (
    /* CONTENIDO MODAL 1 */
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Compartir Tareas</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>{title}</Text>
      <Text style={[styles.title]}>Estado</Text>
      <View style={[styles.status, { backgroundColor: completed ? "#4ade80" : "#f87171" }]}>
        <Text style={[styles.title, { color: "white" }]}>{completed ? "Completado" : "Incompletado"}</Text>
      </View>
      <Text styles={[styles.description]}>Participantes</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>{author.name}</Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>{sharedWith.name}</Text>
        </View>
        <View></View>
      </View>
    </View>
  )
}

export default SharedTodoModalContent

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "900",
    color: "black",
  },
  participant: {
    backgroundColor: "#8b5cf6",
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
});