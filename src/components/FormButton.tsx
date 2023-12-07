
import {  useFormStatus } from "react-dom";
import { ReactNode } from "react";

interface FormButtonProps {
    classNames?: string;
    children?: ReactNode;
}


export function FormButton({children}:FormButtonProps) {
    const { pending } = useFormStatus();
    return (
      <button
        disabled={pending}
      >
        {pending ? "...." : <p>{children ?? "save"}</p>}
      </button>
    );
  }

