import createNote from "app/mutations/createNote"
import getUserNotes from "app/queries/getUserNotes"
import { BlitzPage, useParam, useQuery, invoke } from "blitz"
import React, { Suspense, useState } from "react"

const NoteMain = () => {
  const [text, setText] = useState("")
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(val) => {
            setText(val.target.value)
          }}
          placeholder="text"
          className="form-input px-4 py-3 rounded-full"
        ></input>
      </div>
      <button
        onClick={async () => {
          await invoke(createNote, text)
        }}
      >
        Add
      </button>
    </div>
  )
}

const NotesDisplay = () => {
  const [notes] = useQuery(getUserNotes, undefined)
  return (
    <div>
      {notes.map((note) => (
        <div>{note.text}</div>
      ))}
    </div>
  )
}

const NotesPage: BlitzPage = () => {
  return (
    <div className="container m-8 p-8 h-screen w-screen">
      <Suspense fallback={<div>Loading ....</div>}>
        <NoteMain />
        <NotesDisplay />
      </Suspense>
    </div>
  )
}

export default NotesPage
