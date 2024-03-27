import { setContext } from '@/api/authInterceptorWithSSR';
import { getProjectDetail } from '@/api/projects/projects';
import Container from '@/components/UI/Container';
import Header from '@/components/UI/Header';
import ProjectEditForm from '@/components/projects/EditForm';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';

type ParamsType = {
  project_id: string;
};

type ProjectEditProps = {
  isUpdateState: boolean;
  projectId?: number;
  initialDetailData: {
    title: string;
    description: string;
    startedAt: string;
    finishedAt: string;
    isActive: boolean;
  };
};

export default function ProjectEdit({
  isUpdateState = false,
  projectId,
  initialDetailData,
}: ProjectEditProps) {
  const [isUpdate, setIsUpdate] = useState(isUpdateState);
  const [initialDetail, _] = useState(initialDetailData);

  return (
    <div>
      <Header />
      <Container>
        <div className="flex items-center justify-between py-4 my-4 border-b border-gray-600 ">
          <h1 className="text-xl font-semibold">프로젝트 생성</h1>
        </div>
        <div>
          <ProjectEditForm
            isUpdate={isUpdate}
            projectId={projectId}
            {...initialDetail}
          />
        </div>
      </Container>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParamsType>
) {
  const { project_id } = context.query as ParamsType;

  if (!project_id) {
    return {
      props: {
        isUpdateState: false,
        initialDetailData: null,
      },
    };
  }

  setContext(context);
  try {
    const { data } = await getProjectDetail(Number(project_id));

    if (data?.data) {
      return {
        props: {
          initialDetailData: data.data,
          isUpdateState: true,
          projectId: Number(project_id),
        },
      };
    } else {
      return {
        props: {
          initialDetailData: null,
          isUpdateState: false,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        error: '프로젝트 상세를 불러오는데 실패했습니다.',
      },
    };
  }
}
