import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  Button,
  Appbar,
  IconButton,
  Modal,
  Portal,
} from "react-native-paper";
import { useNoteDatabase, NoteDatabase } from "../database/useNoteDatabase";

export default function Index() {
  const router = useRouter();
  const noteDatabase = useNoteDatabase();
  const [notes, setNotes] = useState<NoteDatabase[]>([]);
  const [change, setChange] = useState(false);

  const [visible, setVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const showModal = (id: number) => {
    setVisible(true);
    setSelectedNoteId(id); 
  };
  const hideModal = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        try {
          const response = await noteDatabase.showAll();
          setNotes(response); 
          setChange(false);
          // console.log("Se ejecuta cada vez que el componente se enfoca");
        } catch (error) {
          console.log(error);
          Alert.alert("Error", "No se pudieron cargar las notas");
        }
      };
      fetchNotes(); 
      return () => {
        // console.log("Limpiando efecto de enfoque");
      };
    }, [change])
  );

  async function deleteNote() {
    if (selectedNoteId !== null) {
      try {
        await noteDatabase.remove(selectedNoteId);
        setChange(true);
        hideModal();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "No se pudo eliminar la nota");
      }
    }
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fbfbfb" }}>
        <Appbar.Content
          title="Aplicación de Notas"
          titleStyle={{ textAlign: "left" }}
        />
        <Appbar.Action icon="plus" onPress={() => router.push("/AddNote")} />
        {/* <Appbar.Action icon="cog" onPress={() => router.push("/AddNote")} /> */}
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: "#fbfbfb" }}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <View style={{ flexDirection: "row" }} key={note.id}>
              <Button
                style={{
                  backgroundColor: note.color,
                  marginBottom: 5,
                  borderRadius: 0,
                  padding: 10,
                  width: "80%",
                }}
                labelStyle={{ color: "black" }}
                contentStyle={{ justifyContent: "flex-start" }}
                // key={note.id}
                onPress={() =>
                  router.push({
                    pathname: "/NoteView",
                    params: { id: note.id },
                  })
                }
              >
                {note.title}
              </Button>
              <TouchableOpacity
                style={{
                  width: "20%",
                  justifyContent: "center",
                  backgroundColor: note.color,
                  marginBottom: 5,
                }}
                onPress={() => {
                  showModal(note.id)
                }}
              >
                <IconButton icon={"delete"} style={{ alignSelf: "center" }} />
              </TouchableOpacity>
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
                  <Text style={{textAlign:"center", marginBottom: 10}}>¿Seguro que quieres borrar la nota?</Text>
                  <Button mode="contained" onPress={()=> deleteNote()}>Borrar</Button>
                </Modal>
              </Portal>
            </View>
          ))
        ) : (
          <Text>No hay notas disponibles</Text>
        )}
      </ScrollView>
    </>
  );
}
