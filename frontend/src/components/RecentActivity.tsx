import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RecentActivity: React.FC = () => {
  const navigate = useNavigate();
  
  const recentActivities = [
    {
      user: {
        name: 'Kevin C.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
        action: 'added a photo',
        timeAgo: '4 minutes ago',
      },
      business: {
        name: 'Round 1',
        rating: 3,
        reviewCount: 15,
        categories: ['Arcades', 'Bowling'],
        image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=400&h=300&q=80',
      },
      type: 'photo',
    },
    {
      user: {
        name: 'Kevin C.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
        action: 'wrote a review',
        timeAgo: '5 minutes ago',
      },
      business: {
        name: 'The Chop Shop',
        rating: 5,
        reviewText:
          'Super kind & friendly barbers that are true professionals and masters of their craft.',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&h=300&q=80',
      },
      type: 'review',
    },
    {
      user: {
        name: 'Kevin C.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
        action: 'added 3 photos',
        timeAgo: '5 minutes ago',
      },
      business: {
        name: 'The Anchovy Bar',
        rating: 4,
        reviewCount: 269,
        categories: ['Seafood'],
        images: [
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=300&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&h=300&q=80',
        ],
      },
      type: 'photos',
    },
  ];

  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-red-500 text-red-500' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Recent Activity
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-12 h-12 rounded-full border-2 border-red-100 cursor-pointer hover:border-red-300 transition-colors"
                    onClick={() => navigate('/user/profile')}
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{activity.user.name}</div>
                    <div className="text-sm text-gray-500">
                      {activity.user.action} • {activity.user.timeAgo}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-3">{activity.business.name}</h3>
                  <div className="flex items-center mb-3">
                    {renderStars(activity.business.rating)}
                    {activity.business.reviewCount && (
                      <span className="ml-2 text-gray-500">({activity.business.reviewCount})</span>
                    )}
                  </div>
                  {activity.business.categories && (
                    <div className="flex gap-2 mb-4">
                      {activity.business.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  {activity.business.reviewText && (
                    <p className="text-gray-600 mb-4">{activity.business.reviewText}</p>
                  )}
                  {activity.type === 'photos' ? (
                    <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                      {activity.business.images?.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${activity.business.name} photo ${i + 1}`}
                          className="w-full h-40 object-cover"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={activity.business.image}
                      alt={activity.business.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  )}
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                  <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    Useful
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};