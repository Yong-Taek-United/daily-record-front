import { logout } from '@/api/account/auth';
import { SaveUserInfoTypes } from '@/types/user';
import { getDataFromLocalStorage } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ProfileImg from './ProfileImg';

type MenuListType = {
  name: string;
  path?: string;
  method?: () => void;
};

const MENU_LIST: MenuListType[] = [
  { name: '내 프로필', path: '/account/manage/info' },
  { name: '설정', path: '/account/manage/setting' },
];

export default function Header() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const user: SaveUserInfoTypes =
    typeof window !== 'undefined' && getDataFromLocalStorage('user');

  const handleLogout = async () => {
    try {
      const { data, status } = await logout();
      if (status === 200) {
        router.push('/account/login');
      }
    } catch (error) {}
  };

  return (
    <div className="w-full h-16 bg-white flex justify-between p-4">
      <div className="my-auto">
        <button
          onClick={() => router.push('/main')}
          className="text-lg font-semibold"
        >
          Daily Record
        </button>
      </div>
      <div className="relative flex my-auto">
        <button
          onClick={() => router.push('/projects/dash-board')}
          className="mr-4 font-semibold"
        >
          내 프로젝트
        </button>
        <div>
          <ProfileImg
            onClick={() => setOpenMenu(!openMenu)}
            width={32}
            height={32}
          />
        </div>

        {openMenu ? (
          <div
            className={`absolute z-50 top-10 right-0 w-auto border rounded-md bg-white`}
          >
            <div className="w-40 p-2 border-b">
              <button className="font-semibold">{user?.nickname}</button>
            </div>
            {MENU_LIST.map((menu, i) => (
              <div key={menu.name} className="p-2">
                <button
                  onClick={
                    !menu.method
                      ? () => router.push(`${menu.path}`)
                      : menu.method
                  }
                  className="w-full text-left font-medium text-[#828282] hover:text-black duration-500"
                >
                  {menu.name}
                </button>
              </div>
            ))}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full text-left font-medium text-[#828282] hover:text-black duration-500"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
