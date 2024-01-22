import Header from '@/components/UI/Navbar';
import SideMenu from '@/components/account/manage/SideMenu';

export default function AccountUserPage() {
  return (
    <main className="bg-gray-50 w-full h-screen">
      <Header />
      <div className="flex justify-between py-6 px-10">
        <div title="SideMenu" className="w-80">
          <SideMenu />
        </div>
        <div></div>
      </div>
    </main>
  );
}
