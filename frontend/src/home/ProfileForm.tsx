import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm,useFieldArray } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ProfileSchema } from '@/lib/validation';
import { updateProfile } from "@/lib/api";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle, X } from "lucide-react"
import ServerError from "@/lib/utils/serverError";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/lib/utils/loader";
const ProfileForm = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const {mutate, isPending ,isError, error } = useMutation({
        mutationFn : updateProfile,
        onSuccess: ()=>{
          queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
        onError:(err)=>{
          console.log((err));
        }
    });
    const form = useForm<z.infer<typeof ProfileSchema>>({
      resolver: zodResolver(ProfileSchema),
      defaultValues: {
        ...(user?.profile),
        languages: user?.profile?.languages || [],
        social_media_links: user?.profile?.social_media_links || []
      },
    });
    const { fields: socialMediaFields, append: appendSocialMedia, remove: removeSocialMedia } = useFieldArray({
      control: form.control,
      name: "social_media_links"
    });
    
    const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
      control: form.control,
      name: "languages"
    });
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ProfileSchema>) {
            mutate(values);
    }
  if(isPending) return <Loader isLoading={isPending}/>
  else
  return (
    <Form {...form}>
      {isError ? (
        <div className="h-fit w-60 text-wrap text-red-600 ">
          {(error as ServerError).message}
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="FullName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <label className="text-sm font-medium">Languages</label>
          {languageFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-2">
              <FormField
                control={form.control}
                name={`languages.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Enter a programming language"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeLanguage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendLanguage("")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Language
          </Button>
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <label className="text-sm font-medium">Social Media Links</label>
          {socialMediaFields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2 mt-2">
              <FormField
                control={form.control}
                name={`social_media_links.${index}.handle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      Social Media Handle
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="handle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`social_media_links.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Social Media URL</FormLabel>
                    <FormControl>
                      <Input placeholder="link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialMedia(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendSocialMedia({ handle: "", url: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Social Media Link
          </Button>
        </div>

        {isPending ? (
          <Button disabled>
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
      </form>
    </Form>
  );
}

export default ProfileForm

