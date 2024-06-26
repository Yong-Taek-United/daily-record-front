import { logout } from '@/api/account/auth';
import { SaveUserInfoTypes } from '@/types/user';
import { getDataFromLocalStorage } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ProfileImg from './ProfileImg';
import { deleteCookie } from 'cookies-next';

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
    } catch (error) {
    } finally {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      router.push('/account/login');
    }
  };

  return (
    <div className="flex justify-between w-full h-16 p-4 bg-white">
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
          <>
            <div
              onClick={() => setOpenMenu(false)}
              className="fixed z-[15] top-0 left-0 w-screen h-screen bg-transparent"
            ></div>
            <div
              className={`absolute z-50 top-10 right-0 w-auto border border-gray-400 rounded-md bg-white`}
            >
              <div className="w-40 p-2 border-b border-gray-400">
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
          </>
        ) : null}
      </div>
    </div>
  );
}
