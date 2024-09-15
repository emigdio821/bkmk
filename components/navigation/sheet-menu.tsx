import { MenuIcon, ShoppingBasketIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from './menu'

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-describedby={undefined}
        className="flex h-full max-w-72 flex-col justify-between p-0 sm:w-72"
      >
        <SheetHeader>
          <SheetTitle className="flex max-h-14 items-center p-4 pb-0 sm:p-6 sm:pb-0">
            <ShoppingBasketIcon className="hidden size-6" />
            <h1 className="ml-2 flex-nowrap text-2xl font-bold">Título</h1>
          </SheetTitle>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
