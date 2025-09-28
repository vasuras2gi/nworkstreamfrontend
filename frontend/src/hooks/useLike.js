// useLike.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../lib/api";

const useToggleLike = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      // Posts ko refresh karo taki latest like count turant aa jaye
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { toggleLikeMutation: mutate, isPending, error };
};

export default useToggleLike;
