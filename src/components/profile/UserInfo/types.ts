import type { UserInfoData } from '../../../types/user';

export interface UserInfoProps {
  className?: string;
}

export interface UserInfoContentProps extends UserInfoProps {
  userInfo: UserInfoData;
}