import { useSQLiteContext } from "expo-sqlite"

export type NoteDatabase = {
  id: number
  title: string
  content: string
  color: string
}

export function useNoteDatabase() {
  const database = useSQLiteContext()

  const defaultNote: NoteDatabase = {
    id: 0,
    title: "Nota no encontrada",
    content: "Esta es una nota por defecto. No se pudo cargar la nota.",
    color: "gray",
  };

  async function create(data: Omit<NoteDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO notes (title, content, color) VALUES ($title, $content, $color)"
    )

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $content: data.content,
        $color: data.color,

      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByName(title: string) {
    try {
      const query = "SELECT * FROM notes WHERE title LIKE ?"

      const response = await database.getAllAsync<NoteDatabase>(
        query,
        `%${title}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: NoteDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE notes SET title = $title, content = $content, color = $color WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $title: data.title,
        $content: data.content,
        $color: data.color
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM notes WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM notes WHERE id = ?"

      const response = await database.getFirstAsync<NoteDatabase>(query, [
        id,
      ])

      return response || defaultNote
    } catch (error) {
      throw error
    }
  }

  async function showAll() {
    try {
      const query = "SELECT * FROM notes"

      const response = await database.getAllAsync<NoteDatabase>(query)

      return response
    } catch (error) {
      throw error
    }
  }

  return { create, searchByName, update, remove, show, showAll}
}