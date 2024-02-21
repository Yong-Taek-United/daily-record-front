import Header from '@/components/UI/Header';
import SideMenu from '@/components/account/manage/SideMenu';

export default function AccountProjectPage() {
  return (
    <main className="bg-gray-50 w-full h-screen">
      <Header />
      <div className="flex justify-between py-6 px-10">
        <div title="SideMenu" className="w-80">
          <SideMenu active="프로젝트 설정" />
        </div>
        <div></div>
      </div>
    </main>
  );
}
