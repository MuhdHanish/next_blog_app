import React from "react";

export default function NoDataFound({ children }: { children: React.ReactNode }) {
  return <div className="py-6">{children}</div>
};