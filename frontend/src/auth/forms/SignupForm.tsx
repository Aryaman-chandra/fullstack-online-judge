import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from '@/lib/validation';
import { signup } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"
import ServerError from "@/lib/utils/serverError";
const SignupForm = () => {
    // 1. Define your form.
    const navigate = useNavigate();
    const {mutate, isPending ,isError, error } = useMutation({
        mutationFn : signup,
        onSuccess: ()=>{
            navigate('/home',{replace : true});
        },
        onError:(err)=>{
          console.log((err));
        }
    });
    const form = useForm<z.infer<typeof SignupValidation>>({
      resolver: zodResolver(SignupValidation),
      defaultValues: {
        username: "",
        email : "",
        password:""
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SignupValidation>) {
            mutate(values);
    }
  return (
      <Form {...form}>
          {isError ? <div className="h-fit w-60 text-wrap text-red-700 ">{(error as ServerError).message}</div> : <></>}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full h-3 flex justify-end">
          <NavLink to={"/auth/sign-in"} className="text-primary text-xs" replace={true}>Already have an Account?</NavLink>
          </div>
          {isPending?  <Button disabled> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>:  <Button type="submit" >Sign Up</Button>}
        </form>
      </Form>
  )
}

export default SignupForm

