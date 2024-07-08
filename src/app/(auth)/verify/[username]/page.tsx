// "use client"
// import { Button } from '@/components/ui/button'
// import { FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { useToast } from '@/components/ui/use-toast'
// import { verifySchema } from '@/schemas/verifySchema'
// import { ApiResponse } from '@/types/ApiResponse'
// import { zodResolver } from '@hookform/resolvers/zod'
// import axios, { AxiosError } from 'axios'
// import { useParams, useRouter } from 'next/navigation'
// // import { useRouter } from 'next/router'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { Form } from '@/components/ui/form'
// import * as z from 'zod'

// const VerifyAccount = () => {
//     const router = useRouter()
//     const params = useParams<{ username: string }>()
//     const { toast } = useToast()
//     const form = useForm<z.infer<typeof verifySchema>>({
//         resolver: zodResolver(verifySchema),

//     })

//     const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//         try {
//             const resonse = await axios.post(`/api/verify-code`, {
//                 username: params.username,
//                 code: data.Code
//             })

//             toast({
//                 title: 'Success',
//                 description: resonse.data.message
//             })
//             // router.push('/sign-in')
//             router.replace('/sign-in')

//         } catch (error) {
//             console.error("Error signing up of user", error);
//             const AxiosError = error as AxiosError<ApiResponse>;

//             toast({
//                 title: 'Sign-up failed',
//                 description: AxiosError.response?.data.message,
//                 variant: 'destructive'
//             })
//         }

//     }
//     return (
//         <div className='flex min-h-screen items-center justify-center bg-gray-100'>
//             <div className='w-full max-w-md rounded-lg bg-white p-8 space-y-8 shadow-md'>
//                 <div className='text-center'>
//                     <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
//                         Verify Your Account
//                     </h1>
//                     <p className='mb-4'>
//                         Enter the verifiacation code sent to your email
//                     </p>

//                 </div>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         <FormField
//                             name="Code"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Verification Code</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="code" {...field} />
//                                     </FormControl>
//                                     {/* <FormDescription>
//                                         This is your public display name.
//                                     </FormDescription> */}
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit">Submit</Button>
//                     </form>
//                 </Form>

//             </div>
//         </div>
//     )
// }

// export default VerifyAccount

"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import * as z from 'zod'

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{ username: string }>()
    const { toast } = useToast()
    const [timeLeft, setTimeLeft] = useState(10)
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })

    useEffect(() => {
        if (timeLeft === 0) {
            toast({
                title: 'Time expired',
                description: 'Time expired. Please try again.',
                variant: 'destructive',
            })
        }

        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1)
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [timeLeft, toast])

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        if (timeLeft === 0) {
            toast({
                title: 'Time expired',
                description: 'Time expired. Please try again.',
                variant: 'destructive',
            })
            return
        }

        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.Code,
            })

            toast({
                title: 'Success',
                description: response.data.message,
            })
            router.replace('/sign-in')
        } catch (error) {
            console.error("Error signing up user", error)
            const axiosError = error as AxiosError<ApiResponse>

            toast({
                title: 'Verification failed',
                description: axiosError.response?.data.message,
                variant: 'destructive',
            })
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md rounded-lg bg-white p-8 space-y-8 shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                        Verify Your Account
                    </h1>
                    <p className='mb-4'>
                        Enter the verification code sent to your email
                    </p>
                    <p className='mb-4'>
                        Time left: {timeLeft} seconds
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="Code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={timeLeft === 0}>Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerifyAccount

