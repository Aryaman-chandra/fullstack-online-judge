import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProblem } from "@/lib/api";
import { Loader } from "@/lib/utils/loader";

const problemSchema = z.object({
  title: z.string().min(4).max(12),
  statement: z.string().min(15).max(300),
  testcases: z.array(z.object({
    input: z.string(),
    output: z.string()
  })),
  time_limit: z.number().positive(),
  memory_limit: z.number().positive()
});

export default function CreateProblemForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [testcaseFiles, setTestcaseFiles] = useState<{ input: File | null, output: File | null }[]>([]);
  const form = useForm<z.infer<typeof problemSchema>>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      statement: "",
      testcases: [],
      time_limit: 1,
      memory_limit: 128
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testcases"
  });

  const readFileAsString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
    const handleFileChange = (index: number, type: 'input' | 'output', file: File | null) => {
    setTestcaseFiles(prev => {
      const newFiles = [...prev];
      if (!newFiles[index]) {
        newFiles[index] = { input: null, output: null };
      }
      newFiles[index][type] = file;
      return newFiles;
    });
  };
  async function onSubmit(values: z.infer<typeof problemSchema>) {
    setIsProcessing(true);
    try {
      const processedTestcases = await Promise.all(
        testcaseFiles.map(async (testcase, index) => {
          if (!testcase.input || !testcase.output) {
            throw new Error(`Test case ${index + 1} is missing input or output file`);
          }
          return {
            input: await readFileAsString(testcase.input),
            output: await readFileAsString(testcase.output)
          };
        })
      );

      const processedValues = {
        ...values,
        testcases: processedTestcases
      };

      mutate(processedValues);
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setIsProcessing(false);
    }
  }
  if(isPending) return <Loader isLoading={isPending}/>
  else 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter problem title" {...field} />
              </FormControl>
              <FormDescription>
                Title should be between 4 and 12 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Statement</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the problem" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Statement should be between 15 and 300 characters.
                <br/>
                Markdown and LaTeX supported.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

         <div>
          <label className="text-sm font-medium">Test Cases</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2 mt-2">
              <FormItem>
                <FormLabel className="sr-only">Test Case Input File</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => handleFileChange(index, 'input', e.target.files?.[0] || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel className="sr-only">Test Case Output File</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => handleFileChange(index, 'output', e.target.files?.[0] || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  remove(index);
                  setTestcaseFiles(prev => {
                    const newFiles = [...prev];
                    newFiles.splice(index, 1);
                    return newFiles;
                  });
                }}
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
            onClick={() => {
              append({ input: "", output: "" });
              setTestcaseFiles(prev => [...prev, { input: null, output: null }]);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Test Case
          </Button>
        </div>
        <FormField
          control={form.control}
          name="time_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit (seconds)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memory_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memory Limit (MB)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isProcessing || isPending}>
          {isProcessing ? 'Processing...' : isPending ? 'Submitting...' : 'Submit Problem'}
        </Button>  
        </form>
    </Form>
  );
}
