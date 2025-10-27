'use server';

import { auth } from '@clerk/nextjs/server';
import { supabase } from '../supabase';
import { revalidatePath } from 'next/cache';

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const { data, error } = await supabase
    .from('session_history')
    .upsert(
      { companion_id: companionId, user_id: userId },
      { onConflict: 'user_id, companion_id' },
    );
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

export const getUserSessions = async (limit = 10) => {
  const { userId } = await auth();

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

export const getUserCompanions = async () => {
  const { userId } = await auth();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('author', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  const UserCompanions = data.map((companions) => companions);
  return { UserCompanions, error };
};

export async function addBookmark(companionId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ user_id: userId, companion_id: companionId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(`/companions/${companionId}`);
  revalidatePath(`/`);
  revalidatePath(`/my-journey`);
  return data;
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

export const getUserBookmarks = async () => {
  const { userId } = await auth();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`companion:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  const companions = data.map(({ companion }) => companion);
  return { companions };
};
