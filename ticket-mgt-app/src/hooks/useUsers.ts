import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { AddUsersRequest, ListUsersParams } from '../types/settings';

export const USER_KEYS = {
  all: ['users'] as const,
  list: (params?: ListUsersParams) => ['users', 'list', params] as const,
};

export function useUsers(params?: ListUsersParams) {
  return useQuery({
    queryKey: USER_KEYS.list(params),
    queryFn: () => userService.listUsers(params),
  });
}

export function useAddUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddUsersRequest) => userService.addUsers(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
}
