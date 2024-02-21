import { useRouter } from 'next/router';

type MenuListType = {
  name: string;
  path: string;
  // isSelect: boolean;
};

type ActivePageProp = '내 정보' | '구독 관리' | '계정 설정' | '프로젝트 설정';

const MENU_LIST: MenuListType[] = [
  { name: '내 정보', path: '/account/manage/info' },
  { name: '구독 관리', path: '/account/manage/subscription' },
  { name: '계정 설정', path: '/account/manage/setting' },
  { name: '프로젝트 설정', path: '/account/manage/project' },
];

export default function SideMenu({ active }: { active: ActivePageProp }) {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full rounded-t-lg bg-gray-100">
        <button
          className="p-3 flex-1 rounded-t-lg font-semibold text-lg text-gray-400"
          onClick={() =>
            router.push({ pathname: '/account/profile' }, undefined, {
              shallow: true,
            })
          }
        >
          프로필
        </button>
        <button
          className="bg-white p-3 flex-1 rounded-t-lg font-bold text-lg"
          onClick={() =>
            router.push({ pathname: '/account/manage' }, undefined, {
              shallow: true,
            })
          }
        >
          계정 관리
        </button>
      </div>
      <div className="bg-white px-8 pb-5 pt-14 rounded-b-lg">
        {MENU_LIST.map((menu, i) => (
          <div key={menu.name} className="my-3 p-3">
            <button
              onClick={() => router.push(`${menu.path}`)}
              className={`font-semibold text-lg ${
                menu.name === active ? 'text-blue-500' : 'text-black'
              }`}
            >
              {menu.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
