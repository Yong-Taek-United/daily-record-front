import Header from '@/components/UI/Header';
import ProfileIntroItem from '@/components/account/manage/ProfileIntroItem';
import SettingForm from '@/components/account/manage/SettingForm';
import SideMenu from '@/components/account/manage/SideMenu';

export default function AccountSettingPage() {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex justify-center py-6">
        <div title="SideMenu" className="hidden w-80 lg:inline">
          <SideMenu active="계정 설정" />
        </div>
        <div className="md:w-[600px] lg:ml-10">
          <p className="mb-2 font-semibold text-gray-500">기본 설정</p>
          <SettingForm />
          <p className="mt-4 mb-2 font-semibold text-gray-500">프로필 정보</p>
          <ProfileIntroItem />
        </div>
      </div>
    </main>
  );
}
