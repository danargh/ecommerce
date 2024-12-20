"use client";

import * as React from "react";
import {
   CaretSortIcon,
   ChevronDownIcon,
   DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { User } from "@/interfaces";
import { useDeleteUsers } from "@/api/users";

interface Props {
   userData?: User[];
}

export function DashboardTableCustomers({ userData = [] }: Props) {
   const [tableData, setTableData] = React.useState(userData || []);
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});
   const {
      status: removeUserStatus,
      data: removedUserData,
      mutateAsync: mutateRemoveUser,
   } = useDeleteUsers();

   const handleDeleteUser = (userId: number) => {
      mutateRemoveUser(userId, {
         onSuccess: () => {
            setTableData((prev) => prev.filter((user) => user.id !== userId));
         },
      });
   };

   const columns: ColumnDef<User>[] = [
      {
         id: "select",
         header: ({ table }) => (
            <Checkbox
               checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
               }
               onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
               }
               aria-label="Select all"
            />
         ),
         cell: ({ row }) => (
            <Checkbox
               checked={row.getIsSelected()}
               onCheckedChange={(value) => row.toggleSelected(!!value)}
               aria-label="Select row"
            />
         ),
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "id",
         header: "Id",
         cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
         ),
      },
      {
         accessorKey: "email",
         header: ({ column }) => (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Email
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         ),
         cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
         ),
      },
      {
         accessorKey: "name",
         header: () => <div className="text-right">Name</div>,
         cell: ({ row }) => (
            <div className="text-right font-medium">{row.getValue("name")}</div>
         ),
      },
      {
         accessorKey: "createdAt",
         header: () => <div className="text-right">Created At</div>,
         cell: ({ row }) => {
            const createdAt = row.getValue("createdAt");
            const formattedDate = new Intl.DateTimeFormat("en-US", {
               year: "numeric",
               month: "long",
               day: "numeric",
               hour: "numeric",
               minute: "numeric",
            }).format(new Date(createdAt as Date));

            return (
               <div className="text-right font-medium">{formattedDate}</div>
            );
         },
      },
      {
         accessorKey: "updatedAt",
         header: () => <div className="text-right">Updated At</div>,
         cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt");
            const formattedDate = new Intl.DateTimeFormat("en-US", {
               year: "numeric",
               month: "long",
               day: "numeric",
               hour: "numeric",
               minute: "numeric",
            }).format(new Date(updatedAt as Date));

            return (
               <div className="text-right font-medium">{formattedDate}</div>
            );
         },
      },
      {
         accessorKey: "role",
         header: () => <div className="text-right">Role</div>,
         cell: ({ row }) => (
            <div className="text-right font-medium">{row.getValue("role")}</div>
         ),
      },
      {
         id: "actions",
         header: () => <div className="text-right">Actions</div>,
         cell: ({ row }) => (
            <div className="flex justify-end">
               <Button onClick={() => handleDeleteUser(row.original.id)}>
                  Delete
               </Button>
            </div>
         ),
      },
      // {
      //    id: "actions",
      //    enableHiding: false,
      //    cell: ({ row }) => {
      //       const user = row.original;

      //       return (
      //          <DropdownMenu>
      //             <DropdownMenuTrigger asChild>
      //                <Button variant="ghost" className="h-8 w-8 p-0">
      //                   <span className="sr-only">Open menu</span>
      //                   <DotsHorizontalIcon className="h-4 w-4" />
      //                </Button>
      //             </DropdownMenuTrigger>
      //             <DropdownMenuContent align="end">
      //                <DropdownMenuLabel>Actions</DropdownMenuLabel>
      //                {/* <DropdownMenuItem
      //                   onClick={() =>
      //                      navigator.clipboard.writeText(
      //                         user.id as unknown as string
      //                      )
      //                   }
      //                >
      //                   Copy ID
      //                </DropdownMenuItem> */}
      //                <DropdownMenuSeparator />
      //                <DropdownMenuItem>Promote Role</DropdownMenuItem>
      //                <DropdownMenuItem>Delete User</DropdownMenuItem>
      //             </DropdownMenuContent>
      //          </DropdownMenu>
      //       );
      //    },
      // },
   ];

   const table = useReactTable({
      data: tableData,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),

      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   });

   return (
      <div className="w-full">
         <div className="flex items-center py-4">
            <Input
               placeholder="Filter emails..."
               value={
                  (table.getColumn("email")?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                     Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => (
                        <DropdownMenuCheckboxItem
                           key={column.id}
                           className="capitalize"
                           checked={column.getIsVisible()}
                           onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                           }
                        >
                           {column.id}
                        </DropdownMenuCheckboxItem>
                     ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <TableHead key={header.id}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </TableHead>
                        ))}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
               {table.getFilteredSelectedRowModel().rows.length} of{" "}
               {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
               {table.getState().pagination.pageIndex + 1} {"of "}
               {table.getPageCount()}
            </div>
            <div className="space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   );
}
