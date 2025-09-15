'use server';

import { auth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '../supabase';
import { revalidatePath } from 'next/cache';

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author: userId })
        .select();
    if (error || !data) {
        return {
            data: null,
            error: {
                message:
                    'Failed to create companion, please try again later or report the issue',
                code: error?.code,
                details: error?.details,
                hint: error?.hint,
            },
        };
    }
    const companion = data[0];
    revalidatePath(`/companions/${companion.id}`);

    return { companion, error: null };
};
