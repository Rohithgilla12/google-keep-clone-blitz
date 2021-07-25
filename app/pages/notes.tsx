import createNote from "app/mutations/createNote"
import deleteNote from "app/mutations/deleteNote"
import getUserNotes from "app/queries/getUserNotes"
import { BlitzPage, useQuery, invoke } from "blitz"
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
        <div
          className="flex flex-col justify-around flex-space-between w-1/5 h-32 border-2 border-blue-200 rounded m-2 p-2"
          key={note.id}
        >
          <p className="text-gray-700 text-base">{note.text}</p>
          <button
            className="float-right"
            onClick={async () => {
              await invoke(deleteNote, note.id)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
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
