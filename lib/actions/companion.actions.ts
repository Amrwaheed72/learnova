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
    if (error) throw new Error(error.message);
    return { companions, error };
};

export const getOneCompanion = async (id: string) => {
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id);
    if (error) throw new Error('error displaying the companion');
    if (!data || data.length === 0) throw new Error('Companion not found');
    const companion = data[0];
    return { companion, error };
};

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId } = await auth();
    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author: userId })
        .select();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0)
        throw new Error('Could not create companion');
    const companion = data[0];
    revalidatePath(`/companions/${companion.id}`);

    return { companion, error };
};

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const { data, error } = await supabase
        .from('session_history')
        .insert({ companion_id: companionId, user_id: userId });
    if (error) throw new Error(error.message);
    revalidatePath('/');
    return { data, error };
};

export const getRecentSession = async (
    limit = 10,
): Promise<{
    companions: Companion[];
    error: string | null;
}> => {
    const { data, error } = await supabase
        .from('session_history')
        .select(`companion:companion_id (id, subject, topic, duration, name)`)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw new Error(error.message);

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
    if (error) throw new Error(error.message);
    const companions = data.map(({ companion }) => companion);
    return { companions, error };
};

export const getUserCompanions = async (userId: string) => {
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    const UserCompanions = data.map((companions) => companions);
    return { UserCompanions, error };
};

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const session = await auth();
    console.log(session);
    let limit = 0;
    if (has({ feature: 'unlimited_companions' })) {
        return true;
    } else if (has({ feature: '3_companion_limit' })) {
        limit = 3;
    } else if (has({ feature: '10_companion_limit' })) {
        limit = 10;
    }
    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId);
    if (error) throw new Error(error.message);
    const companionCount = data?.length;
    if (companionCount >= limit) {
        return false;
    } else {
        return true;
    }
};
export async function addBookmark(companionId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Not authenticated');
    const { data, error } = await supabase
        .from('bookmarks')
        .insert({ user_id: userId, companion_id: companionId })
        .select();
    if (error) throw new Error(error.message);
    revalidatePath(`/companions/${companionId}`);
    revalidatePath(`/`);
    revalidatePath(`/my-journey`);
    return true; // ✅ Return "isBookmarked" = true
}

export async function removeBookmark(companionId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Not authenticated');
    const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('companion_id', companionId);
    if (error) throw new Error(error.message);
    revalidatePath(`/companions/${companionId}`);
    revalidatePath(`/`);
    revalidatePath(`/my-journey`);
    return false;
}

export const getUserBookmarks = async (userId: string) => {
    const { data, error } = await supabase
        .from('bookmarks')
        .select(`companion:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    const companions = data.map(({ companion }) => companion);
    return { companions };
};

export const DeleteCompanion = async ({
    userId,
    companionId,
}: {
    userId: string;
    companionId: string;
}) => {
    const { error } = await supabase
        .from('companions')
        .delete()
        .eq('id', companionId)
        .eq('author', userId);
    if (error) throw new Error(error.message);
    revalidatePath('/my-journey');
    revalidatePath('/');
};
