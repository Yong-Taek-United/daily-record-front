import { getColors, getTaskCategories } from '@/api/projects/categories';
import useSWR from 'swr';

function useCategories() {
  // 색상 카테고리 가져오기
  function useColors() {
    const { data, error, isLoading } = useSWR(`/colors/list`, getColors);

    return {
      colors: data?.data.data,
      ColorsLoading: isLoading,
      ColorsError: error,
    };
  }

  // 과제 카테고리 가져오기
  function useTaskCategories() {
    const { data, error, isLoading } = useSWR(
      `/categories/list`,
      getTaskCategories
    );

    return {
      taskCategories: data?.data.data,
      TaskCategoriesLoading: isLoading,
      TaskCategoriesError: error,
    };
  }

  return { useColors, useTaskCategories };
}

export { useCategories };
