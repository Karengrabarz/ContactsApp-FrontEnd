import { forwardRef } from "react";

export const Input = forwardRef(({ error, label, ...rest }, ref) => {
  return (
    <div>
      <label className="paragraph label">{label}</label>
      <input className="paragraph placeholder" ref={ref} {...rest} />
      {error ? (
        <p className="paragraph label negative">{error.message}</p>
      ) : null}
    </div>
  );
});
