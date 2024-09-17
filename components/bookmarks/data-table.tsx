'use client'

import { useMemo, useState } from 'react'
import type { Bookmark } from '@/types'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import { useTags } from '@/hooks/use-tags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter'
import { DataTablePagination } from '@/components/data-table-pagination'
import { CreateBookmarkDialog } from './create-dialog'

interface DataTableProps {
  columns: Array<ColumnDef<Bookmark>>
  data: Bookmark[]
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { data: tags } = useTags()

  const getTagsFilterData = useMemo(() => {
    const data = []
    if (tags) {
      for (const tag of tags) {
        data.push({
          label: tag.name,
          value: tag.id.toString(),
        })
      }
    }

    return data
  }, [tags])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  })

  return (
    <>
      <div className="mb-4 flex flex-col-reverse items-center gap-2 md:flex-row">
        <Input
          className="max-w-sm"
          placeholder="Filter by name"
          value={(table.getColumn('name')?.getFilterValue() as string) || ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        />
        <div className="flex items-center space-x-2">
          <DataTableFacetedFilter column={table.getColumn('tags')} title="Tags" options={getTagsFilterData} />
          <CreateBookmarkDialog trigger={<Button>Create bookmark</Button>} />
        </div>
      </div>
      <div className="mb-2 overflow-y-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  )
}
