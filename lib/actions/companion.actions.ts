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
    return { companions, error };
};

export const getOneCompanion = async (id: string) => {
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id);
    if (error) throw error;
    const companion = data[0];
    return { companion, error };
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

    return { companion, error };
};

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const { data, error } = await supabase
        .from('session_history')
        .insert({ companion_id: companionId, user_id: userId });
    if (error) throw error;
    revalidatePath('/');
    return { data, error };
};

export const getRecentSession = async (
    limit = 10,
): Promise<{
    companions: Companion[];
    error: any;
}> => {
    const { data, error } = await supabase
        .from('session_history')
        .select(`companion:companion_id (id, subject, topic, duration, name)`)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;

    const companions = data.map(({ companion }) => companion);
    return { companions, error };
};

export const getUserSessions = async (userId: string, limit = 10) => {
    const { data, error } = await supabase
        .from('session_history')
        .select(`companion:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) throw error;
    const companions = data.map(({ companion }) => companion);
    return { companions, error };
};

export const getUserCompanions = async (userId: string) => {
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    const UserCompanions = data.map((companions) => companions);
    return { UserCompanions, error };
};
