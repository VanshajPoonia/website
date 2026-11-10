"use client";

import { useEffect, useId, useState } from "react";

// The cover's title block: "Operating manual for ___". Whatever the visitor
// types stays in their own browser and pre-fills the project form later.
export const PREPARED_KEY = "kv:preparedFor";

export function readPrepared(): string {
  try {
    return localStorage.getItem(PREPARED_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function PreparedFor({ revision }: { revision: string }) {
  const id = useId();
  const [value, setValue] = useState("");

  useEffect(() => setValue(readPrepared()), []);

  const save = (v: string) => {
    setValue(v);
    try {
      if (v.trim()) localStorage.setItem(PREPARED_KEY, v.trim());
      else localStorage.removeItem(PREPARED_KEY);
    } catch {
      /* storage blocked: the field still works for this visit */
    }
  };

  return (
    <div className="titleblock">
      <div className="titleblock__cell titleblock__cell--wide">
        <label htmlFor={id} className="titleblock__k mono">
          Operating manual for
        </label>
        <input
          id={id}
          className="titleblock__input"
          value={value}
          onChange={(e) => save(e.target.value)}
          placeholder="Your business"
          autoComplete="organization"
          maxLength={60}
          spellCheck={false}
        />
      </div>
      <div className="titleblock__cell">
        <span className="titleblock__k mono">Revision</span>
        <span className="titleblock__v mono">{revision}</span>
      </div>
    </div>
  );
}
