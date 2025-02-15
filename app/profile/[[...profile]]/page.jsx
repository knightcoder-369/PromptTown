import { UserProfile } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Profile = async () => {
  const user = await currentUser();
  
  if (!user) {
    redirect("/");
  }

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <h1 className='text-2xl'>{user?.username}</h1>
      <UserProfile />
    </div>
  );
}

export default Profile;