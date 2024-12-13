import {
  Text,
  Appbar,
  TextInput,
  Modal,
  Portal,
  Button,
} from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { useNoteDatabase, NoteDatabase } from "../database/useNoteDatabase";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#FFFF88");
  const router = useRouter();
  const noteDatabase = useNoteDatabase();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  async function createNote() {
    try {
      const response = await noteDatabase.create({
        title,
        content,
        color,
      });
      Alert.alert("Nota con id: ", response.insertedRowId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Appbar.Header style={{backgroundColor: color}}>
        <Appbar.BackAction
          onPress={() => {
            if (title != "") {
              createNote();
              router.back();
            } else if (content != "") {
              Alert.alert("Añade un titulo para guardar");
            } else {
              router.back();
            }
          }}
        />
        <Appbar.Content
          title={
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center"}}
            >
              <TextInput
                style={{ width: "80%", backgroundColor: color }}
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
                    borderRadius: 10
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
        style={{ backgroundColor: color }}
        multiline={true}
        numberOfLines={40}
        onChangeText={(content) => setContent(content)}
        value={content}
      />
    </>
  );
}
