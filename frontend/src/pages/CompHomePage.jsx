import React from 'react'
import HomePage from './HomePage'
import UserSearchBar from '../components/userSearchBar'

const CompHomePage = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Search bar at top */}
      <div className="sticky top-0 z-10 bg-base-100 shadow-md">
        <UserSearchBar />
      </div>

      {/* Content below search bar */}
      <div className="flex-1">
        <HomePage />
      </div>
    </div>
  );
};

export default CompHomePage;