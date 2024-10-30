import { getAllOrders } from "@/actions/order";
import { DashboardTableOrder } from "@/components/DashboardTableOrder";
// import { taskSchema } from "./data/schema";

export default async function OrdersPage() {
   const { success, data, error } = await getAllOrders({
      success: false,
      error: false,
   });

   return (
      <>
         <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Pesanan</h2>
               </div>
            </div>
            {/* <DataTable data={tasks} columns={columns} /> */}
            <DashboardTableOrder orderData={data} />
         </div>
      </>
   );
}
