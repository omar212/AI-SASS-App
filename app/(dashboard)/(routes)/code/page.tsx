"use client";

import * as z from "zod";
import { useState } from "react";
import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
// import ChatCompletionRequestMessage from "openai"

interface ChatCompletionRequestMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }


const CodePage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };
            
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: newMessages,
            })

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            // TODO: Open Pro Model
            console.log(error);
        } finally {
            router.refresh();
        }
    };


    return ( 
        <div>
            <Heading 
                title="Code Generation" 
                description="Generate code snippets using the power of AI."
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10" 
            />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                                rounded-lg
                                border
                                w-full
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                gridgrid-cols=12
                                gap-2
                            ">
                                <FormField
                                    name="prompt"
                                    render={({ field}) => (
                                        <FormItem className="col-span-12 lg:col-span-10">
                                            <FormControl className="m-0 p-0">
                                                <Input 
                                                    className="
                                                        border-0 
                                                        outline-none 
                                                        focus-visible:ring-0
                                                        focus-visible:ring-transparent
                                                    "
                                                    placeholder="Simple toggle button using react hooks."
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )} 
                                />
                                <Button className="col-span-12 lg:col-span-2 w-full">
                                    Generate
                                </Button>
                            </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    
                    {messages.length === 0 && !isLoading && (
                            <Empty label="No conversation started." />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {
                            messages.map((message) => {
                                console.log(message)
                                return (
                                    <div 
                                        key={message.content}
                                        className={cn(
                                            "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                            message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                        )}>
                                        {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                        <p className="text-sm">
                                            {message.content}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>  
    );
}
 
export default CodePage;