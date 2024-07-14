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
import { createContest } from "@/lib/api";
import { Loader } from "@/lib/utils/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const contestSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().min(15).max(500),
  start_time: z.string(),
  end_time: z.string(),
  problems: z.array(z.object({
    title: z.string().min(4).max(25),
    statement: z.string().min(15).max(300),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    points: z.number().positive(),
    time_limit: z.number().positive(),
    memory_limit: z.number().positive(),
    testcases: z.array(z.object({
      input: z.string(),
      output: z.string()
    })),
  })),
});

export default function CreateContestForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [testcaseFiles, setTestcaseFiles] = useState<{ [problemIndex: number]: { input: File | null, output: File | null }[] }>({});
  
  const form = useForm<z.infer<typeof contestSchema>>({
    resolver: zodResolver(contestSchema),
    defaultValues: {
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      time_limit: 1,
      memory_limit: 128,
      problems: [],
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createContest,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const { fields: problemFields, append: appendProblem, remove: removeProblem } = useFieldArray({
    control: form.control,
    name: "problems"
  });

  const readFileAsString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFileChange = (problemIndex: number, testcaseIndex: number, type: 'input' | 'output', file: File | null) => {
    setTestcaseFiles(prev => {
      const newFiles = { ...prev };
      if (!newFiles[problemIndex]) {
        newFiles[problemIndex] = [];
      }
      if (!newFiles[problemIndex][testcaseIndex]) {
        newFiles[problemIndex][testcaseIndex] = { input: null, output: null };
      }
      newFiles[problemIndex][testcaseIndex][type] = file;
      return newFiles;
    });
  };

  async function onSubmit(values: z.infer<typeof contestSchema>) {
    setIsProcessing(true);
    try {
      const processedProblems = await Promise.all(values.problems.map(async (problem, problemIndex) => {
        const processedTestcases = await Promise.all(
          (testcaseFiles[problemIndex] || []).map(async (testcase, testcaseIndex) => {
            if (!testcase.input || !testcase.output) {
              throw new Error(`Problem ${problemIndex + 1}, Test case ${testcaseIndex + 1} is missing input or output file`);
            }
            return {
              input: await readFileAsString(testcase.input),
              output: await readFileAsString(testcase.output)
            };
          })
        );

        return {
          ...problem,
          testcases: processedTestcases
        };
      }));
      values.start_time = values.start_time.toString();
      values.end_time = values.end_time.toString();
      const processedValues = {
        ...values,
        problems: processedProblems
      };

      console.log(processedValues);
      mutate(processedValues);
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  if (isPending) return <Loader isLoading={isPending} />
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter contest title" {...field} />
              </FormControl>
              <FormDescription>
                Title should be between 4 and 50 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the contest" 
                  className="resize-y h-40" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Description should be between 15 and 500 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <label className="text-sm font-medium">Problems</label>
          {problemFields.map((field, problemIndex) => (
            <div key={field.id} className="space-y-4 mt-4 p-4 border rounded">
              <FormField
                control={form.control}
                name={`problems.${problemIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter problem title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`problems.${problemIndex}.statement`}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`problems.${problemIndex}.difficulty`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy" className="text-green-500">Easy</SelectItem>
                          <SelectItem value="Medium" className="text-yellow-500">Medium</SelectItem>
                          <SelectItem value="Hard" className="text-red-500">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`problems.${problemIndex}.points`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`problems.${problemIndex}.time_limit`}
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
                name={`problems.${problemIndex}.memory_limit`}
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

              <div>
                <label className="text-sm font-medium">Test Cases</label>
                {(testcaseFiles[problemIndex] || []).map((_, testcaseIndex) => (
                  <div key={testcaseIndex} className="flex items-end space-x-2 mt-2">
                    <FormItem>
                      <FormLabel className="sr-only">Test Case Input File</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="text/plain"
                          onChange={(e) => handleFileChange(problemIndex, testcaseIndex, 'input', e.target.files?.[0] || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel className="sr-only">Test Case Output File</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="text/plain"
                          onChange={(e) => handleFileChange(problemIndex, testcaseIndex, 'output', e.target.files?.[0] || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setTestcaseFiles(prev => {
                          const newFiles = { ...prev };
                          newFiles[problemIndex].splice(testcaseIndex, 1);
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
                    setTestcaseFiles(prev => {
                      const newFiles = { ...prev };
                      if (!newFiles[problemIndex]) {
                        newFiles[problemIndex] = [];
                      }
                      newFiles[problemIndex].push({ input: null, output: null });
                      return newFiles;
                    });
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Test Case
                </Button>
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeProblem(problemIndex)}
              >
                <X className="mr-2 h-4 w-4" />
                Remove Problem
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => appendProblem({
              title: "",
              statement: "",
              difficulty: "Easy",
              points: 0,
              time_limit: 1,
              memory_limit: 128,
              testcases: [],
            })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Problem
          </Button>
        </div>

        <Button type="submit" disabled={isProcessing || isPending}>
          {isProcessing ? 'Processing...' : isPending ? 'Submitting...' : 'Create Contest'}
        </Button>
      </form>
    </Form>
  );
}
