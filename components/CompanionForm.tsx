'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import FormFieldComponent from './FormFieldComponent';
const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is Required' }),
    subject: z.string().min(1, { message: 'Subject is Required' }),
    topic: z.string().min(1, { message: 'Topic is Required' }),
    voice: z.string().min(1, { message: 'Voice is Required' }),
    style: z.string().min(1, { message: 'Style is Required' }),
    duration: z.coerce.number().min(1, { message: 'Duration is Required' }),
});
type CompanionFormValues = z.infer<typeof formSchema>;

const CompanionForm = () => {
    const form = useForm<CompanionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: CompanionFormValues) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormFieldComponent
                    form={form}
                    name="name"
                    label="Companion Name"
                    placeholder="Enter the companion name"
                    type="input"
                />
                <FormFieldComponent
                    form={form}
                    name="subject"
                    label="Subject"
                    placeholder="Select the Subject"
                    type="select"
                />
                <FormFieldComponent
                    form={form}
                    name="topic"
                    label="What should the companion help with?"
                    placeholder="Ex. Derivatives & Integrals"
                    type="textarea"
                />
                <FormFieldComponent
                    form={form}
                    name="voice"
                    label="Voice"
                    placeholder="Select the Voice"
                    type="select"
                />
                <FormFieldComponent
                    form={form}
                    name="style"
                    label="Style"
                    placeholder="Select the Style"
                    type="select"
                />
                <FormFieldComponent
                    form={form}
                    name="duration"
                    label="Estimated session duration in minutes"
                    placeholder="15"
                    type="input"
                />
                <Button type="submit" className="w-full cursor-pointer">
                    Build Your Companion
                </Button>
            </form>
        </Form>
    );
};

export default CompanionForm;
