'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@supabase/auth-js'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { editUserSchema } from '@/lib/schemas/form'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/spinner'

export function EditDialog({ user }: { user: User }) {
  const router = useRouter()
  const supabase = createClient()
  const [openDialog, setOpenDialog] = useState(false)
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.user_metadata.name || '',
      avatar: user.user_metadata.avatar || '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    const { error } = await supabase.auth.updateUser({
      password: values.password || undefined,
      data: {
        avatar: values.avatar,
        name: values.name,
      },
    })

    if (error) {
      toast.error('Error', { description: error.message })
      return
    }

    setOpenDialog(false)
    toast.success('Success', { description: 'Profile updated' })
    router.refresh()
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(isOpen) => {
        if (form.formState.isSubmitting) {
          setOpenDialog(true)
        }
        setOpenDialog(isOpen)
      }}
    >
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-sm"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e)
            }}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Save {form.formState.isSubmitting && <Spinner className="ml-2" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
