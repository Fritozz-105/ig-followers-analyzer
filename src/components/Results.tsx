"use client";

import { FollowerResultsProps } from "@/types";

export default function Results({ followers, following, onReset }: FollowerResultsProps) {
  const followersSet = new Set(followers);
  const followingSet = new Set(following);

  const notFollowingBack = following.filter((user) => !followersSet.has(user));
  const notFollowing = followers.filter((user) => !followingSet.has(user));
  const mutualFollows = following.filter((user) => followersSet.has(user));

  const generateDynamicInsights = () => {
    // Mutual connections insight
    const mutualCount = mutualFollows.length;
    let mutualInsight = "";
    if (mutualCount === 0) {
      mutualInsight = "No mutual connections - consider engaging more with followers";
    } else if (mutualCount <= 299) {
      mutualInsight = `${mutualCount} mutual connections - decent engagement level`;
    } else if (mutualCount <= 999) {
      mutualInsight = `${mutualCount} mutual connections - good community engagement`;
    } else if (mutualCount <= 9999) {
      mutualInsight = `${mutualCount} mutual connections - strong community presence`;
    } else {
      mutualInsight = `${mutualCount} mutual connections - excellent community engagement`;
    }

    // Unbalanced follows insight
    const unbalancedCount = notFollowingBack.length;
    let unbalancedInsight = "";
    if (unbalancedCount === 0) {
      unbalancedInsight = "Perfect balance - everyone you follow follows you back!";
    } else if (unbalancedCount <= 50) {
      unbalancedInsight = `${unbalancedCount} unbalanced follows - very manageable`;
    } else if (unbalancedCount <= 200) {
      unbalancedInsight = `${unbalancedCount} unbalanced follows - consider reviewing`;
    } else if (unbalancedCount <= 500) {
      unbalancedInsight = `${unbalancedCount} unbalanced follows - might need cleanup`;
    } else {
      unbalancedInsight = `${unbalancedCount} unbalanced follows - significant cleanup recommended`;
    }

    // Follow ratio insight
    const ratio = followers.length / following.length;
    let ratioInsight = "";
    if (ratio > 2) {
      ratioInsight = "Strong influence - you have significantly more followers than following";
    } else if (ratio > 1.5) {
      ratioInsight = "Good influence - healthy follower to following ratio";
    } else if (ratio > 0.8) {
      ratioInsight = "Balanced ratio - similar followers and following counts";
    } else if (ratio > 0.5) {
      ratioInsight = "Active follower - you follow more people than follow you";
    } else {
      ratioInsight = "Very active follower - consider being more selective";
    }

    // Engagement potential insight
    const potentialCount = notFollowing.length;
    let potentialInsight = "";
    if (potentialCount === 0) {
      potentialInsight = "Following all your followers - maximum engagement";
    } else if (potentialCount <= 100) {
      potentialInsight = `${potentialCount} potential follows - good engagement opportunity`;
    } else if (potentialCount <= 500) {
      potentialInsight = `${potentialCount} potential follows - significant engagement opportunity`;
    } else {
      potentialInsight = `${potentialCount} potential follows - large untapped audience`;
    }

    return [
      {
        color: "red",
        title: "Unbalanced Follows",
        description: unbalancedInsight,
      },
      {
        color: "purple",
        title: "Connections Quality",
        description: mutualInsight,
      },
      {
        color: "blue",
        title: "Follow Ratio Analysis",
        description: ratioInsight,
      },
      {
        color: "green",
        title: "Engagement Potential",
        description: potentialInsight,
      },
    ];
  };

  const dynamicInsights = generateDynamicInsights();

  const StatCard = ({
    title,
    count,
    color,
    icon,
    children,
  }: {
    title: string;
    count: number;
    color: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${color}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                color.includes("red")
                  ? "bg-red-100"
                  : color.includes("green")
                  ? "bg-green-100"
                  : "bg-blue-100"
              }`}
            >
              {icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">{title}</h3>
              <p
                className={`text-2xl font-bold ${
                  color.includes("red")
                    ? "text-red-600"
                    : color.includes("green")
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {count}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  const UserList = ({ users, linkColor }: { users: string[]; linkColor: string }) => (
    <div className="space-y-2">
      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No users in this category</p>
      ) : (
        users.map((user) => (
          <div
            key={user}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-semibold">
                  {user.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-gray-700">@{user}</span>
            </div>
            <a
              href={`https://instagram.com/${user}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm ${linkColor} hover:underline flex items-center`}
            >
              View
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Analysis Results</h1>
            <p className="text-gray-600">Here&apos;s your Instagram follower analysis breakdown</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
        >
          Upload New Files
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">{following.length}</div>
          <div className="text-gray-600 font-medium">Following</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
          <div className="text-3xl font-bold text-pink-600 mb-2">{followers.length}</div>
          <div className="text-gray-600 font-medium">Followers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
          <div className="text-3xl font-bold text-green-600 mb-2">{mutualFollows.length}</div>
          <div className="text-gray-600 font-medium">Mutual</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {((mutualFollows.length / following.length) * 100).toFixed(1)}%
          </div>
          <div className="text-gray-600 font-medium">Follow Back Rate</div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard
          title="OPs (Not Following Back)"
          count={notFollowingBack.length}
          color="border-l-4 border-red-400"
          icon={
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
        >
          <UserList users={notFollowingBack} linkColor="text-red-600" />
        </StatCard>

        <StatCard
          title="Mutual Follows"
          count={mutualFollows.length}
          color="border-l-4 border-green-400"
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
        >
          <UserList users={mutualFollows} linkColor="text-green-600" />
        </StatCard>

        <StatCard
          title="Fans (Don't Follow Back)"
          count={notFollowing.length}
          color="border-l-4 border-blue-400"
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          }
        >
          <UserList users={notFollowing} linkColor="text-blue-600" />
        </StatCard>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dynamicInsights.map((insight, index) => (
            <div key={index} className="flex items-start">
              <div
                className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  insight.color === "red"
                    ? "bg-red-500"
                    : insight.color === "purple"
                    ? "bg-purple-500"
                    : insight.color === "blue"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              ></div>
              <div>
                <p className="font-semibold text-gray-700">{insight.title}</p>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
