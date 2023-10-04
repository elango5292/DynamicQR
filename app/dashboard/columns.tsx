"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Payment = {
  id: string
  Name: string
  content: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
]
