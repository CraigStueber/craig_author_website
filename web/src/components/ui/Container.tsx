import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  const classes = ["container", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
