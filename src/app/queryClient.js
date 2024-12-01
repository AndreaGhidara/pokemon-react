import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minuti Validita del dato
            cacheTime: 1000 * 60 * 10, // 10 minuti Cache del dato
            refetchOnWindowFocus: false, // Non refetch se la finestra è in focus
        },
    },
});

export default queryClient;