import { Text, Appbar, TextInput, Portal, Button, Modal } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNoteDatabase, NoteDatabase } from "../database/useNoteDatabase";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";

export default function NoteView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#FFEB3B");

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const noteDatabase = useNoteDatabase();
  const [notes, setNotes] = useState<NoteDatabase>();

  async function updateNote() {
    try {
      // console.log("Color en update ", color)
      await noteDatabase.update({
        id: Number(id),
        title,
        content,
        color
      });
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        try {
          const response = await noteDatabase.show(Number(id));
          setNotes(response);
          setTitle(response?.title || "");
          setContent(response?.content || "")
          setColor(response.color)
          // console.log("Se ejecuta cada vez que el componente se enfoca");
        } catch (error) {
          console.log(error);
        }
      };
      fetchNotes(); 
      return () => {
        // console.log("Limpiando efecto de enfoque");
      };
    }, []) 
  );


  // useEffect(() => {
  //   console.log(color);
  // }, [color]);
  return (
    <>
      <Appbar.Header style={{backgroundColor: color}}>
        <Appbar.BackAction
          onPress={() => {
            updateNote();
            router.back();
      
          }}
        />
        <Appbar.Content
          title={
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                style={{ width: "80%", backgroundColor: color}}
                value={title}
                onChangeText={(title) => setTitle(title)}
              />
              <Button labelStyle={{color: "black"}} style={{ width: "20%" }} onPress={showModal}>
                Color
              </Button>
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={{
                    backgroundColor: "white",
                    padding: 20,
                    alignItems: "center",
                    alignSelf: "center",
                    width: "60%",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>
                    Selecciona un color
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FFFF88",
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        setColor("#FFFF88");
                      }}
                    ></TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EBC6D5",
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        setColor("#EBC6D5");
                      }}
                    ></TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#D4EBCF",
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        setColor("#D4EBCF");
                      }}
                    ></TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#A6D2E7",
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        setColor("#A6D2E7");
                      }}
                    ></TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FEAD8F",
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        setColor("#FEAD8F");
                      }}
                    ></TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#CAC8F7",
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        setColor("#CAC8F7");
                      }}
                    ></TouchableOpacity>
                  </View>
                </Modal>
              </Portal>
            </View>
          }
        />
      </Appbar.Header>
      <TextInput
      style={{backgroundColor: color}}
        multiline={true}
        numberOfLines={40}
        onChangeText={(content) => setContent(content)}
        value={content}
      />
    </>
  );
}
