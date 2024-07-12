import { auth } from "@/auth"
import { lusitana } from '@/app/ui/fonts';
import { fetchProfile } from '@/app/lib/data';
import LatestPosts from '@/app/ui/dashboard/latest-posts';

export default async function Page() {
    const session = await auth();

    if (!session?.user) return null

    const profilePromise = await Promise.all([fetchProfile(session.user.id || "")]);
    const profile = profilePromise[0];

    return (
        <div>
          <div>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Profile Information
            </h1>
            <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
              <div className="w-full">
                <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                  <img 
                    className="w-32 h-32 rounded-full object-cover" 
                    src={profile.image_url} 
                    alt="Profile" 
                  />
                  <h1 className="text-2xl font-bold text-gray-900 mt-4">{profile.name}</h1>
                  <p className="text-lg text-gray-700 mt-2">18 Followers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
              {/* @ts-expect-error Async Server Component */}
              <LatestPosts />
          </div>
        </div>
      );
}