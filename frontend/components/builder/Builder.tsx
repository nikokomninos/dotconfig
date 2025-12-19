"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

/*
 * Builder - a component for the actual script builder UI.
 * Handles any user program selections, and sends them to the
 * backend to generate a script.
 */
const Builder = () => {
  const [programs, setPrograms] = useState<string[]>([]);
  const [script, setScript] = useState<string>("");

  // Grabs all the programs from the database upon mounting
  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/builder/programs`,
      );
      const data = await res.json();
      setPrograms(data);
    };

    fetchPrograms();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold mb-8">Programs</h1>
          <ProgramBox programs={programs} setScript={setScript} />
        </div>

        <div className="col-span-1 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold mb-8">Script</h1>
          <div className="w-200 h-200 border border-(--border) rounded-md p-5 overflow-scroll whitespace-pre-wrap">
            <pre>
              <code>{script}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
 * ProgramBox - the box on the left side of the builder
 * screen. Contains all the user-selectable programs, and a
 * button to generate the script
 */
const ProgramBox = ({
  programs,
  setScript,
}: {
  programs: string[];
  setScript: Dispatch<SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  // Easy way to store the selected programs in a
  // useState array. Filters an unselected program out of the
  // previous state, or appends a selected program to the
  // previous state
  const toggleProgram = (program: string) => {
    setSelected((prev) =>
      prev.includes(program)
        ? prev.filter((p) => p !== program)
        : [...prev, program],
    );
  };

  // Sends the request to generate the script,
  // it is currently hardcoded to only generate scripts
  // for Arch Linux
  const generateScript = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/builder/generate-script`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            programs: selected,
            os: "arch",
          }),
        },
      );

      const data = await res.json();
      setScript(data.script);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-200 h-200 border border-(--border) rounded-md p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Uncategorized</h1>
        <button
          type="submit"
          onClick={() => generateScript()}
          className="text-md mb-4 border border(--border) rounded-md px-2 py-1 bg-(--button) text-foreground-alt"
        >
          Generate
        </button>
      </div>
      {programs.map((program) => (
        <label key={program} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={selected.includes(program)}
            onChange={() => toggleProgram(program)}
            className="accent-foreground"
          />
          {program}
        </label>
      ))}
    </div>
  );
};

export default Builder;
