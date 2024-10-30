"use client";

import * as React from "react";
import {
   CaretSortIcon,
   ChevronDownIcon,
   DotsHorizontalIcon,
   DoubleArrowLeftIcon,
   DoubleArrowRightIcon,
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
import { Product, User } from "@/interfaces";
import { useDeleteUsers } from "@/api/users";
import { DashboardProductsForm } from "./DashboardProductForm";
import { useCreateProduct, useDeleteProduct } from "@/api/product";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
   productData?: Product[];
}

export function DashboardTableProduct({ productData = [] }: Props) {
   const [tableData, setTableData] = React.useState(productData || []);
   const [editData, setEditData] = React.useState<Product>();
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});
   const { status: createProductStatus, mutateAsync: mutateCreateProduct } =
      useCreateProduct();
   const {
      status: deleteProductStatus,
      data: removedProductData,
      mutateAsync: mutateDeleteProduct,
   } = useDeleteProduct();

   const handleDeleteProduct = (userId: number) => {
      mutateDeleteProduct(userId, {
         onSuccess: () => {
            setTableData((prev) => prev.filter((user) => user.id !== userId));
         },
      });
   };
   const handleEditProduct = (productId: number) => {
      const editProduct = tableData.find((product) => product.id === productId);
      setEditData(editProduct);
   };

   const columns: ColumnDef<Product>[] = [
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
         accessorKey: "name",
         header: ({ column }) => (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Name
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         ),
         cell: ({ row }) => (
            <div className="lowercase">{row.getValue("name")}</div>
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
         accessorKey: "description",
         header: () => <div className="text-right">Description</div>,
         cell: ({ row }) => (
            <div className="text-right font-medium">
               {row.getValue("description")}
            </div>
         ),
      },
      {
         accessorKey: "price",
         header: () => <div className="text-right">Price</div>,
         cell: ({ row }) => (
            <div className="text-right font-medium">
               {row.getValue("price")}
            </div>
         ),
      },
      {
         accessorKey: "stock",
         header: () => <div className="text-right">Stock</div>,
         cell: ({ row }) => (
            <div className="text-right font-medium">
               {row.getValue("stock")}
            </div>
         ),
      },
      {
         accessorKey: "categoryId",
         header: () => <div className="text-right">Category</div>,
         cell: ({ row }) => {
            const category: Product = row.getValue("categoryId"); // Mengambil objek categoryId
            return (
               <div className="text-right font-medium">
                  {category?.name || "No category"}{" "}
               </div>
            );
         },
      },

      {
         id: "actions",
         header: () => <div className="text-right">Actions</div>,
         cell: ({ row }) => (
            <div className="flex justify-end gap-x-2">
               <Button
                  variant={"outline"}
                  onClick={() => handleEditProduct(row.original.id)}
               >
                  Edit
               </Button>
               <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteProduct(row.original.id)}
               >
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
      <>
         <DashboardProductsForm
            onMutateCreateProduct={mutateCreateProduct}
            setTableData={setTableData}
            editData={editData}
         />
         <div className="w-full">
            <div className="flex items-center py-4">
               <Input
                  placeholder="Filter name..."
                  value={
                     (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                     table.getColumn("name")?.setFilterValue(event.target.value)
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
               <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex items-center space-x-2">
                     <p className="text-sm font-medium">Rows per page</p>
                     <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                           table.setPageSize(Number(value));
                        }}
                     >
                        <SelectTrigger className="h-8 w-[70px]">
                           <SelectValue
                              placeholder={table.getState().pagination.pageSize}
                           />
                        </SelectTrigger>
                        <SelectContent side="top">
                           {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                              <SelectItem key={pageSize} value={`${pageSize}`}>
                                 {pageSize}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                     Page {table.getState().pagination.pageIndex + 1} of{" "}
                     {table.getPageCount()}
                  </div>
                  <div className="flex items-center space-x-2">
                     <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                     >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                     >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                     >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() =>
                           table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                     >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
