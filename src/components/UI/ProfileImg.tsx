import { getUserInfo } from '@/api/account/user';
import Image from 'next/image';
import useSWR from 'swr';
type ProfileImgType = {
  width: number;
  height: number;
  onClick: () => void;
};

export default function ProfileImg({ width, height, onClick }: ProfileImgType) {
  const { data } = useSWR('getUserInfo', getUserInfo);

  if (!data) {
    return (
      <button
        onClick={onClick}
        className={`bg-slate-500 rounded-full`}
        style={{ width, height }}
      ></button>
    );
  }
  return (
    <div>
      <Image
        onClick={onClick}
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.data.data.userFile[0].filePath}/${data.data.data.userFile[0].fileName}`}
        alt="profile_img"
        width={width}
        height={height}
        className={`rounded-full border cursor-pointer object-cover`}
        style={{ width, height }}
        priority
      />
    </div>
  );
}
