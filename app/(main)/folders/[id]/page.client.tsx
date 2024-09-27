'use client'

import Link from 'next/link'
import NiceModal from '@ebay/nice-modal-react'
import { IconReload } from '@tabler/icons-react'
import { useFolderItems } from '@/hooks/use-folder-items'
import { useFolders } from '@/hooks/use-folders'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyH4 } from '@/components/ui/typography'
import { columns } from '@/components/bookmarks/columns'
import { DataTable } from '@/components/bookmarks/data-table'
import { CreateBookmarkDialog } from '@/components/dialogs/bookmarks/create'
import { ImportBookmarksDialog } from '@/components/dialogs/bookmarks/import'
import { Loader } from '@/components/loader'

export function FolderItemsClientPage({ id }: { id: string }) {
  const folderId = id
  const { data: folderItems, isLoading, error } = useFolderItems(Number(folderId))
  const { data: folder, isLoading: folderLoading } = useFolders(Number(folderId))

  if (error)
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        <p>Unable to fetch bookmarks, try again.</p>
        <p className="flex items-center">
          <Button variant="link">
            Refetch <IconReload className="ml-2 size-4" />
          </Button>
        </p>
      </div>
    )

  return (
    <>
      {folderLoading ? (
        <div className="flex h-7 items-center">
          <Skeleton className="h-2 w-28" />
        </div>
      ) : (
        <TypographyH4>{folder?.[0]?.name || 'Folder items'}</TypographyH4>
      )}
      <div className="mt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {folderItems && (
              <>
                {folderItems.length > 0 ? (
                  <DataTable columns={columns} data={folderItems} />
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <CardDescription>
                        <span className="font-semibold">This folder is empty.</span>
                        <br />
                        <Button
                          variant="underlineLink"
                          onClick={() => {
                            void NiceModal.show(CreateBookmarkDialog)
                          }}
                        >
                          Create
                        </Button>{' '}
                        or{' '}
                        <Button
                          variant="underlineLink"
                          onClick={() => {
                            void NiceModal.show(ImportBookmarksDialog)
                          }}
                        >
                          import
                        </Button>{' '}
                        your bookmarks and move them to this folder. <br />
                        Or go to{' '}
                        <Button variant="underlineLink">
                          <Link href="/">bookmarks</Link>
                        </Button>{' '}
                        and manage them there.
                      </CardDescription>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
