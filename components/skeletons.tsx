import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export function SettingsProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="my-1 h-2 w-14" />
        </CardTitle>
        <div>
          <Skeleton className="my-1.5 h-2 w-44" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-between gap-2 sm:flex-row">
        <div className="flex items-center space-x-2">
          <Skeleton className="size-16" />
          <div>
            <Skeleton className="mb-2 h-2 w-32" />
            <Skeleton className="my-2 h-2 w-40" />
            <Skeleton className="mt-2 h-2 w-40" />
          </div>
        </div>
        <Skeleton className="h-9 w-[60px]" />
      </CardContent>
    </Card>
  )
}

export function NavItemsSkeleton() {
  return (
    <div className="flex h-9 w-full items-center justify-between px-4">
      <div className="flex items-center">
        <Skeleton className="mr-2 size-4" />
        <Skeleton className="h-2 w-16" />
      </div>
      <Skeleton className="size-4" />
    </div>
  )
}

export function BookmarksPageSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col-reverse items-center gap-2 sm:flex-row">
        <Skeleton className="h-9 w-full max-w-sm" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-[87px]" />
          <Skeleton className="h-9 w-[141px]" />
        </div>
      </div>
      <div className="mb-2 overflow-y-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pr-0">
                <Skeleton className="size-4 rounded-[4px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-2 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-2 w-10" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-2 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-2 w-12" />
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(Array(8).keys()).map((n) => (
              <TableRow key={n}>
                <TableCell className="pr-0">
                  <Skeleton className="size-4 rounded-[4px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="size-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-end gap-2 px-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-2 w-36" />
          <div className="flex items-center space-x-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="hidden size-8 sm:block" />
            <Skeleton className="hidden size-8 sm:block" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-2 w-[93px]" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="text-sm font-medium">
            <Skeleton className="h-2 w-[70px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
