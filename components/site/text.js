import { Fragment } from "react";

/**
 * "*D*esigned Interiors" → script swash "D" + "esigned Interiors".
 * The swash capital is kept on the same line as the rest of its word.
 * Plain strings keep page files simple and avoid React key warnings.
 */
export function rich(str) {
  if (typeof str !== "string") return str;
  const parts = str.split(/\*(.)\*(\S*)/);
  const out = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(<Fragment key={`t${i}`}>{parts[i]}</Fragment>);
    if (i + 1 < parts.length) {
      out.push(
        <span className="nw" key={`w${i}`}>
          <span className="sw">{parts[i + 1]}</span>{parts[i + 2]}
        </span>
      );
    }
  }
  return out;
}
