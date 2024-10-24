import Image from "next/image";

import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";
import { DashboardProductsForm } from "@/components/DashboardProductForm";
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

export default async function ProductsPage() {
   return (
      <>
         <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Produk</h2>
               </div>
            </div>
            <DashboardProductsForm />
            <DataTable data={tasks} columns={columns} />
         </div>
      </>
   );
}
