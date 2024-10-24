import Image from "next/image";

import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";
// import { taskSchema } from "./data/schema";

const tasks = [
   {
      id: "TASK-8782",
      title: "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
   },
   {
      id: "TASK-8782",
      title: "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
   },
];

export default async function OrdersPage() {
   return (
      <>
         <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                     Welcome back!
                  </h2>
                  <p className="text-muted-foreground">
                     Here&apos;s a list of your tasks for this month!
                  </p>
               </div>
            </div>
            <DataTable data={tasks} columns={columns} />
         </div>
      </>
   );
}
