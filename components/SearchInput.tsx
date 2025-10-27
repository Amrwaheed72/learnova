'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('topic') || '';
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'topic',
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['topic'],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, searchQuery, pathname, router]);
  return (
    <div className="relative flex h-fit items-center gap-2 rounded-lg border border-black px-2 py-1 dark:border-white">
      <Image
        src={'/icons/search.webp'}
        alt="search"
        width={15}
        height={15}
        className="dark:invert"
        priority
      />
      <input
        placeholder="Search Companions..."
        className="border-none outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
