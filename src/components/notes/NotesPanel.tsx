import type { Note } from "@/types/index"
import AddNoteForm from "@/components/notes/AddNoteForm"
import NoteDetail from "@/components/notes/NoteDetail"

type NotesPanelProps = {
  notes: Note[] 
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
      <div className="divide-y divide-gray-100">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 mt-6 ">Notas:</p>
            {notes.map((note) => <NoteDetail key={note._id} note={note} />)}
          </>

        ) : <p className="text-gray-500 text-center pt-3">No hay notas</p>}

      </div>
      <AddNoteForm />

    </>
  )
}
