import { PenLineIcon, WandSparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CreateAutomaticBookmarkDialog } from './create-automatic-dialog'
import { CreateManualBookmarkDialog } from './create-manual-dialog'

export function CreateBookmarkDropdown({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger || <Button>Create bookmark</Button>}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <CreateManualBookmarkDialog
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              <PenLineIcon className="mr-2 size-4" />
              Manual
            </DropdownMenuItem>
          }
        />
        <CreateAutomaticBookmarkDialog
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              <WandSparklesIcon className="mr-2 size-4" />
              Automatic
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
