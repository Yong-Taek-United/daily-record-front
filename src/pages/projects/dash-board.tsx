import { GetProjectsRes, getProjects } from '@/api/projects/projects';
import { setContext } from '@/api/authInterceptorWithSSR';
import Container from '@/components/UI/Container';
import Header from '@/components/UI/Header';
import { ProjectListItem } from '@/components/projects/ProjectListItem';
import { ProjectFilterType } from '@/types/projects';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/Button';

type ParamsType = {
  page?: string;
  filter?: ProjectFilterType;
};

const LIST_TAKE = 10;

const FILTER_LIST: { name: string; value: ProjectFilterType }[] = [
  { name: '진행 중인 프로젝트', value: 'ONGOING' },
  { name: '예정된 프로젝트', value: 'SCHEDULED' },
  { name: '지난 프로젝트', value: 'COMPLETED' },
];

export default function DashBoardPage(props: {
  initialListData: GetProjectsRes[];
  initialListCount: number;
  initialPage: number;
  initialFilter: ProjectFilterType;
}) {
  const router = useRouter();
  const [listData, setListData] = useState<GetProjectsRes[]>(
    props.initialListData || []
  );
  const [listCount, setListCount] = useState(props.initialListCount || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(
    props.initialPage || 1
  );
  const [currentFilter, setCurrentFilter] = useState<ProjectFilterType>(
    props.initialFilter || 'ONGOING'
  );

  return (
    <div>
      <Header />
      <Container>
        <div className="flex items-center justify-between py-4 my-4">
          <h1 className="text-xl font-semibold">대시보드</h1>
          <Button
            onClick={() => router.push('/projects/edit')}
            className="w-auto px-2 text-base bg-blue-600"
          >
            프로젝트 생성
          </Button>
        </div>

        {listData.map((project, i) => (
          <ProjectListItem
            key={project.id}
            item={project}
            isLastItem={listData.length === i + 1}
          />
        ))}
      </Container>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParamsType>
) {
  const { page = 1, filter = 'ONGOING' } = context.query as ParamsType;
  const listSkip = (Number(page) - 1) * LIST_TAKE;
  setContext(context);
  try {
    const { data } = await getProjects({
      listTake: LIST_TAKE,
      listSkip,
      projectStatus: filter,
    });

    if (data?.data?.length) {
      return {
        props: {
          initialListData: data.data,
          initialListCount: data.data.length,
          initialPage: Number(page),
          initialFilter: filter,
        },
      };
    } else {
      return {
        props: {
          initialListData: [],
          initialListCount: 0,
          initialPage: Number(page),
          initialFilter: filter,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        error: '프로젝트 목록을 불러오는데 실패했습니다.',
      },
    };
  }
}
