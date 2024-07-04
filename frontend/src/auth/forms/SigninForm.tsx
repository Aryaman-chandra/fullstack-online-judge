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
import { SigninValidation } from "@/lib/validation";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api";
import { Loader2 } from "lucide-react";
import ServerError from "@/lib/utils/serverError";


const SigninForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectUrl = location.state?.redirectUrl || "/home" 
  const {mutate, isPending ,isError, error } = useMutation({
      mutationFn : login,
      onSuccess: ()=>{
          navigate(redirectUrl,{replace : true});
      },
      onError:(err)=>{
        console.log((err));
      }
  });
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SigninValidation>) {
          mutate(values);
  }

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email : "",
      password:""
    },
  })

  return (
    <Form {...form}>

    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isError ? <div className="h-fit w-60 text-wrap text-red-700 ">{(error as ServerError).message}</div> : <></>}
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
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
      <div className="w-full h-2 flex justify-end">
      <NavLink to={"/auth/sign-up"} className="text-primary text-xs" replace={true}>Don't have an Account?</NavLink>
      </div>
      {isPending?  <Button disabled> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>:  <Button type="submit" >Sign Up</Button>}
    </form>
  </Form>
  )
}

export default SigninForm
