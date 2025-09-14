import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { subjects } from '@/constants';

interface Props {
    form: any; // keep generic for now
    label: string;
    placeholder: string;
    name: string;
    type: 'select' | 'input' | 'textarea';
}

// ✅ Define select options in one place (easier to maintain)
const selectOptions: Record<string, string[]> = {
    voice: ['male', 'female'],
    style: ['formal', 'casual'],
    subject: subjects,
};

const FormFieldComponent = ({
    form,
    label,
    placeholder,
    name,
    type,
}: Props) => {
    const options = selectOptions[name] ?? [];

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {type === 'select' ? (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.length > 0 ? (
                                        options.map((option) => (
                                            <SelectItem
                                                key={option}
                                                value={option}
                                                className="capitalize"
                                            >
                                                {option}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem disabled>
                                            No options available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        ) : type === 'input' ? (
                            <Input
                                type={name === 'duration' ? 'number' : 'text'}
                                placeholder={placeholder}
                                {...field}
                            />
                        ) : (
                            <Textarea placeholder={placeholder} {...field} />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldComponent;
