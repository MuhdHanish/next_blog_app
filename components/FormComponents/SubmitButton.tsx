import React from "react";

export const SubmitButton = ({
  isPending,
  children,
}: {
  isPending?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button className="primary-btn" disabled={isPending} type="submit">
      {children}
    </button>
  );
};
