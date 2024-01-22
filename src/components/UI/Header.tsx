import { logout } from '@/api/account/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

type MenuListType = {
  name: string;
  path?: string;
  method?: () => void;
};

const MENU_LIST: MenuListType[] = [
  { name: '내 프로필', path: '/account/info' },
  { name: '설정', path: '/account/manage' },
  { name: '로그아웃', method: () => null },
];

export default function Header() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

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
          onClick={() => setOpenMenu(!openMenu)}
          className="w-8 h-8 bg-slate-500 rounded-full"
        ></button>
        {openMenu ? (
          <div
            className={`absolute z-50 top-10 right-0 w-auto border rounded-md bg-white`}
          >
            <div className="w-40 p-2 border-b">
              <button className="font-semibold">앵가리</button>
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
          </div>
        ) : null}
      </div>
    </div>
  );
}
