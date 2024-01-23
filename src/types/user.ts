export interface UserDataType {
  id: number;

  userType: 'BASIC' | unknown;
  authType: 'BASIC' | unknown;
  email: string;
  username: string;
  nickname: string;
  // passwordChangedAt: null,
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isAdmin: boolean;
  isDeleted: boolean;

  userProfile: {
    id: number;
    phone: string;
    introduce: string;
    isDeleted: boolean;
  };
  userFile: {
    filePath: string;
    fileName: string;
  }[];
}
