import Header from '@/components/UI/Header';
import SettingForm from '@/components/account/manage/SettingForm';
import SideMenu from '@/components/account/manage/SideMenu';

export default function AccountInfoPage() {
  return (
    <main className="w-full h-screen bg-gray-50">
      <Header />
      <div className="flex justify-center py-6 px-auto">
        <div title="SideMenu" className="hidden w-80 lg:inline">
          <SideMenu active="내 정보" />
        </div>
        <div>
          <SettingForm />
        </div>
      </div>
    </main>
  );
}
