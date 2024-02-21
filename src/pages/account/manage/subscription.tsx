import Header from '@/components/UI/Header';
import SideMenu from '@/components/account/manage/SideMenu';

export default function AccountSubscriptionPage() {
  return (
    <main className="bg-gray-50 w-full h-screen">
      <Header />
      <div className="flex justify-between py-6 px-10">
        <div title="SideMenu" className="w-80">
          <SideMenu active="구독 관리" />
        </div>
        <div></div>
      </div>
    </main>
  );
}
