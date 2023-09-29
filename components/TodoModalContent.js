import React, { useState } from 'react'
import { Alert, Button, Keyboard, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const TodoModalContent = ({ id, title }) => {
  const [email, setEmail] = useState('')
  const [focus, setFocus] = useState(false)


  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://react-native-server-production.up.railway.app/todos/shared_todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo_id: id,
          user_id: 1,
          email: email,
        }),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log(data);
      Keyboard.dismiss();
      setEmail("");
      setFocus(false);
      //Alert.alert('Felicidades', `Compartiste exitosamente ${title} con ${email}`, [{ text: 'okay' }]);
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Compartir tarea</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={styles.description}>
        Ingrese el email del usuario a quien deseas compartir tu tarea, Comparte una tarea con alguien y permanece conectado con tus tareas todos los dias.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType='email-address'
        style={[styles.input, focus && { borderWidth: 3, borderColor: "black" }]}
        placeholder='Ingrese el email'
      ></TextInput>
      <Button onPress={handleSubmit} title='Compartir' disabled={email.length === 0}></Button>
    </View >
  )
}

export default TodoModalContent
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
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
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
});