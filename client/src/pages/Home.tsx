import NoteForm from "@/components/NoteForm";
import { NoteLinkCard } from "@/components/NoteLinkCard";
import { useState } from "react";

export default function Home() {
    const [noteLink, setNoteLink] = useState<string>("");
    return (
      <div>
        <div className="space-y-4 mb-12 md:mb-24">
          <h1 className="font-poppins font-bold text-neutral-700 dark:dark:text-neutral-200 m-0 text-4xl md:text-5xl lg:text-6xl text-center">
            Send and receive securely encrypted messages.
          </h1>
          <p className="font-poppins font-normal text-neutral-400 dark:dark:text-neutral-300 text-xl m-0 !text-typo text-center">
            Private Message allows you to share notes and messages with
            end-to-end encryption and a link that expires automatically. So you
            can keep what you share privately and make sure your stuff doesn't
            stay online forever.
          </p>
        </div>
        {noteLink && (
          <NoteLinkCard link={noteLink} setNoteLink={setNoteLink} className="w-full mb-12" />
        )}
        <div className="space-y-4">
          <h3 className="font-poppins text-xl font-semibold text-neutral-700 dark:dark:text-neutral-200">
            Create new private message
          </h3>
          <NoteForm setNoteLink={setNoteLink} />
        </div>
      </div>
    );
}
