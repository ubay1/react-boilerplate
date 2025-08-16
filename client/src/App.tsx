/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./css/index.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { schemaTest } from "./schema-validation/app";
import { useTRPC } from "./lib/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  // ===================== React Hook Form + Zod =================== //
  type FormValues = z.infer<typeof schemaTest>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schemaTest),
    defaultValues: {
      username: "", // fix error "A component is changing an uncontrolled input to be controlled."
    },
  });
  // State for form value
  const [value, setValue] = useState<string>("");
  const onSubmit = (data: FormValues) => {
    setValue(data.username);
  };

  // ===================== React Query + TRPC =================== //
  // use `import { trpc } from './utils/trpc'` if you're using the singleton pattern
  const trpc = useTRPC();
  const greeting = useQuery(trpc.greeting.queryOptions({ name: "ubay" }));
  const getAllUser = useQuery(trpc.user.getAllUser.queryOptions());
  const insertUser = useMutation(
    trpc.user.addUser.mutationOptions({
      onSuccess: (data) => {
        console.log("sukses add data = ", data);
        getAllUser.refetch(); // Refresh user list
      },
    })
  );

  return (
    <div className={"min-h-dvh w-full gap-4 p-4"}>
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-bold">React Boilerplate</div>
        <div className="text-lg text-center mt-2">
          TypeScript, Tailwind + shadcn/ui, React Query (TanStack), tRPC, React
          Hook Form + Zod, Vitest, dan Playwright.
        </div>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>React Hook Form + Zod</CardTitle>
            <CardDescription>
              this is example for validation React Hook Form + Zod
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="home-example-form-input"
                          type="text"
                          placeholder="Enter username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-testid="home-example-error-msg" />
                      {value && (
                        <p data-testid="home-example-username">Hallo {value}</p>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  data-testid="home-example-btn-submit"
                  className="mt-4"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>React Query + TRPC</CardTitle>
            <CardDescription>
              this is example for React Query + TRPC
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <div>{greeting.data?.message}</div>
              {getAllUser.isFetching && (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                </div>
              )}
              {getAllUser.data?.map((user) => (
                <Card key={user.id} className="mb-2">
                  <CardContent>
                    <div>Name: {user.name}</div>
                    <div>Age: {user.age}</div>
                    <div>Role: {user.role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
