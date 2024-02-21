import Header from '@/components/UI/Header';
import SettingForm from '@/components/account/manage/SettingForm';
import SideMenu from '@/components/account/manage/SideMenu';

export default function AccountSettingPage() {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex justify-between py-6 sm:justify-center">
        <div title="SideMenu" className="hidden w-80 lg:inline">
          <SideMenu active="계정 설정" />
        </div>
        <div className="px-5 pt-4 pb-5 bg-white rounded-lg w-[640px] lg:ml-4">
          <SettingForm />
        </div>
      </div>
    </main>
  );
}
