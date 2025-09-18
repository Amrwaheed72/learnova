'use client';

import { motion } from 'framer-motion';

export default function AnimatedWrapper({
    children,
    type,
}: {
    children: React.ReactNode;
    type: string;
}) {
    return (
        <motion.div
            className={`${type === 'session' ? '' : 'flex w-full items-center justify-center'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
