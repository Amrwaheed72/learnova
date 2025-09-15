'use server';

import { auth } from '@clerk/nextjs/server';
import { supabase } from '../supabase';
import { revalidatePath } from 'next/cache';

export const getAllCompanions = async ({
    limit = 10,
    page = 1,
    subject,
    topic,
}: GetAllCompanions) => {
    let query = supabase.from('companions').select();
    if (subject && topic) {
        query = query
            .ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1);
    const { data: companions, error } = await query;
    if (error) throw error;
    return { companions, error: null };
};

export const getOneCompanion = async (id: string) => {
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id);
    if (error) throw error;
    const companion = data[0];
    return { companion, error: null };
};

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId } = await auth();
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
