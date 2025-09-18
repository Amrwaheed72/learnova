'use client';

import { motion } from 'framer-motion';

export default function AnimatedWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            className="flex w-full items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
