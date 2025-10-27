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
  if (!data || data.length === 0) throw new Error('Could not create companion');
  const companion = data[0];
  revalidatePath(`/companions/${companion.id}`);

  return { companion, error };
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  if (!userId) return null;
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

export const DeleteCompanion = async ({
  companionId,
}: {
  companionId: string;
}) => {
  const { userId } = await auth();
  const { error } = await supabase
    .from('companions')
    .delete()
    .eq('id', companionId)
    .eq('author', userId);
  if (error) throw new Error(error.message);
  revalidatePath('/my-journey');
  revalidatePath('/');
};
