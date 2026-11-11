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
