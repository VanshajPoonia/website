// The asterisk on a time estimate. Plain text rather than a link, so it can
// sit inside a link (the contents rows are links). The note it refers to is
// in the footer, at #estimates.
export default function Est() {
  return (
    <>
      <span aria-hidden="true">*</span>
      <span className="sr-only"> (rough estimate)</span>
    </>
  );
}

/** A compact time-back figure for spec lines: "~6 h a week back*". Screen
 *  readers get it in words. */
export function TimeBack({ hours }: { hours: number }) {
  return (
    <>
      <span aria-hidden="true">~{hours} h a week back*</span>
      <span className="sr-only">About {hours} hours a week back (rough estimate)</span>
    </>
  );
}
