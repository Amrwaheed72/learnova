'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (searchQuery.trim()) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: searchQuery,
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [searchParams, searchQuery, pathname, router]);
  return (
    <Select
      value={searchQuery || 'none'}
      onValueChange={(value) => {
        if (value === 'none') {
          setSearchQuery('');
        } else {
          setSearchQuery(value);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select a Subject</SelectLabel>
          <SelectItem value="none">All Subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem value={subject} key={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
