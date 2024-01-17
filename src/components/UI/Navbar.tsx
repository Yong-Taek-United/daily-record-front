import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
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
            <div className="p-2">
              <button
                onClick={() => router.push('/account/info')}
                className="font-medium text-[#828282] hover:text-black duration-500"
              >
                내 프로필
              </button>
            </div>
            <div className="p-2">
              <button onClick={() => router.push('/account/manage')} className="font-medium text-[#828282]  hover:text-black duration-500 ">
                설정
              </button>
            </div>
            <div className="p-2">
              <button className="font-medium text-[#828282] hover:text-black duration-500">
                로그아웃
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
