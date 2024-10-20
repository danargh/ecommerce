import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import React from "react";

interface FormAlertProps {
   children: React.ReactNode;
   type: "error" | "success";
}

// eslint-disable-next-line react/display-name
export const FormAlert = React.forwardRef<HTMLDivElement, FormAlertProps>(
   ({ children, type, ...props }, ref) => {
      return (
         <div
            ref={ref}
            className={`flex gap-x-1 p-3 rounded-md text-sm font-medium mt-4 ${
               type === "error"
                  ? "bg-destructive/15 text-destructive"
                  : "bg-emerald-200 text-success"
            }`}
            {...props}
         >
            {type === "error" && (
               <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            )}
            {children}
         </div>
      );
   }
);
