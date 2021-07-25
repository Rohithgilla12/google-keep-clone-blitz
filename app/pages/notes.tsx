import createNote from "app/mutations/createNote"
import getUserNotes from "app/queries/getUserNotes"
import { BlitzPage, useParam, useQuery, invoke } from "blitz"
import React, { Suspense, useState } from "react"

const NoteMain = () => {
  const [text, setText] = useState("")
  return (
    <div className="flex flex-row">
      <div className="w-screen">
        <input
          type="text"
          onChange={(val) => {
            setText(val.target.value)
          }}
          placeholder="Enter note"
          className="form-input px-4 py-3 w-4/5 rounded-full"
        ></input>
      </div>
      <button
        className="w-1/5 p-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
    <div className="flex flex-wrap flex-row">
      {notes.map((note) => (
        <div className="w-1/5 h-32 border-2 border-blue-200 rounded m-4 p-4" key={note.id}>
          <p className="text-gray-700 text-base">{note.text}</p>
        </div>
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
