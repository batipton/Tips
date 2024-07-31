import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: 'https://tipseco.com',
    },
    {
        url: 'https://tipseco.com/home',
    },
    {
        url: 'https://tipseco.com/login',
    },
    {
        url: 'https://tipseco.com/signup',  
    },
    {
        url: 'https://tipseco.com/home/settings',
    },
    {
        url: 'https://tipseco.com/home/followers',
    },
    {
        url: 'https://tipseco.com/home/profile',
    }
  ]
}