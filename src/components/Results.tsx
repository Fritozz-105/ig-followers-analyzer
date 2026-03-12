"use client";

import { useMemo } from "react";
import { FollowerResultsProps } from "@/types";
import { RotateCcw, X, Heart, Users, ArrowRight } from "lucide-react";

export default function Results({ followers, following, onReset }: FollowerResultsProps) {
  const followersSet = useMemo(() => new Set(followers), [followers]);
  const followingSet = useMemo(() => new Set(following), [following]);

  const notFollowingBack = useMemo(
    () => following.filter((user) => !followersSet.has(user)),
    [following, followersSet],
  );
  const notFollowing = useMemo(
    () => followers.filter((user) => !followingSet.has(user)),
    [followers, followingSet],
  );
  const mutualFollows = useMemo(
    () => following.filter((user) => followersSet.has(user)),
    [following, followersSet],
  );

  const followBackRate =
    following.length > 0 ? ((mutualFollows.length / following.length) * 100).toFixed(1) : "0.0";

  const sanitizeUsername = (username: string): string => {
    return username.replace(/[^a-zA-Z0-9._]/g, "");
  };

  const dynamicInsights = useMemo(() => {
    const mutualCount = mutualFollows.length;
    let mutualInsight = "";
    if (mutualCount === 0) {
      mutualInsight = "No mutual connections — consider engaging more with followers";
    } else if (mutualCount <= 299) {
      mutualInsight = `${mutualCount} mutual connections — decent engagement level`;
    } else if (mutualCount <= 999) {
      mutualInsight = `${mutualCount} mutual connections — good community engagement`;
    } else if (mutualCount <= 9999) {
      mutualInsight = `${mutualCount} mutual connections — strong community presence`;
    } else {
      mutualInsight = `${mutualCount} mutual connections — excellent community engagement`;
    }

    const unbalancedCount = notFollowingBack.length;
    let unbalancedInsight = "";
    if (unbalancedCount === 0) {
      unbalancedInsight = "Perfect balance — everyone you follow follows you back";
    } else if (unbalancedCount <= 50) {
      unbalancedInsight = `${unbalancedCount} unbalanced follows — very manageable`;
    } else if (unbalancedCount <= 200) {
      unbalancedInsight = `${unbalancedCount} unbalanced follows — consider reviewing`;
    } else if (unbalancedCount <= 500) {
      unbalancedInsight = `${unbalancedCount} unbalanced follows — might need cleanup`;
    } else {
      unbalancedInsight = `${unbalancedCount} unbalanced follows — significant cleanup recommended`;
    }

    const ratio = following.length > 0 ? followers.length / following.length : 0;
    let ratioInsight = "";
    if (ratio > 2) {
      ratioInsight = "Strong influence — significantly more followers than following";
    } else if (ratio > 1.5) {
      ratioInsight = "Good influence — healthy follower to following ratio";
    } else if (ratio > 0.8) {
      ratioInsight = "Balanced ratio — similar followers and following counts";
    } else if (ratio > 0.5) {
      ratioInsight = "Active follower — you follow more people than follow you";
    } else {
      ratioInsight = "Very active follower — consider being more selective";
    }

    const potentialCount = notFollowing.length;
    let potentialInsight = "";
    if (potentialCount === 0) {
      potentialInsight = "Following all your followers — maximum engagement";
    } else if (potentialCount <= 100) {
      potentialInsight = `${potentialCount} potential follows — good engagement opportunity`;
    } else if (potentialCount <= 500) {
      potentialInsight = `${potentialCount} potential follows — significant engagement opportunity`;
    } else {
      potentialInsight = `${potentialCount} potential follows — large untapped audience`;
    }

    return [
      { color: "red", title: "Unbalanced Follows", description: unbalancedInsight },
      { color: "purple", title: "Connection Quality", description: mutualInsight },
      { color: "blue", title: "Follow Ratio", description: ratioInsight },
      { color: "green", title: "Engagement Potential", description: potentialInsight },
    ];
  }, [mutualFollows, notFollowingBack, notFollowing, followers.length, following.length]);

  const UserList = ({ users, accentColor }: { users: string[]; accentColor: string }) => (
    <div className="space-y-1.5">
      {users.length === 0 ? (
        <p className="text-zinc-600 text-xs text-center py-6 font-mono">
          No users in this category
        </p>
      ) : (
        users
          .filter((user) => user && typeof user === "string" && user.length > 0)
          .map((user, index) => (
            <div
              key={`${user}-${index}`}
              className="flex items-center justify-between px-3 py-2.5 bg-white/2 rounded-lg hover:bg-white/4 transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                  <span className="text-zinc-400 text-xs font-bold">
                    {user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-zinc-300 text-xs font-mono truncate">@{user}</span>
              </div>
              <a
                href={`https://instagram.com/${sanitizeUsername(user)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity ${accentColor} shrink-0 ml-2`}
              >
                View
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))
      )}
    </div>
  );

  const insightDotColor: Record<string, string> = {
    red: "bg-red-500",
    purple: "bg-violet-500",
    blue: "bg-cyan-500",
    green: "bg-emerald-500",
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-mono text-zinc-600 tracking-widest mb-1">— RESULTS —</p>
          <h1 className="text-2xl font-black text-white tracking-tight">Analysis Complete</h1>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer border border-white/[0.07] px-3 py-2 rounded-lg hover:border-white/20"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New Analysis
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "FOLLOWING", value: following.length, color: "text-zinc-100" },
          { label: "FOLLOWERS", value: followers.length, color: "text-zinc-100" },
          { label: "MUTUAL", value: mutualFollows.length, color: "text-emerald-400" },
          { label: "FOLLOW BACK RATE", value: `${followBackRate}%`, color: "text-cyan-400" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-[#111113] border border-white/6 rounded-xl p-5 text-center"
          >
            <div className={`text-2xl font-black ${color} mb-1`}>{value}</div>
            <div className="text-zinc-600 text-xs font-mono tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Not Following Back */}
        <div className="bg-[#111113] rounded-xl border border-white/6 p-5 text-center">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-1">
              <X className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Not Following Back</h3>
            </div>
            <p className="text-2xl font-black text-red-400 ml-7">{notFollowingBack.length}</p>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto scrollbar-thin">
            <UserList users={notFollowingBack} accentColor="text-red-400" />
          </div>
        </div>

        {/* Mutual Follows */}
        <div className="bg-[#111113] rounded-xl border border-white/6 p-5 text-center">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-1">
              <Heart className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Mutual Follows</h3>
            </div>
            <p className="text-2xl font-black text-emerald-400 ml-7">{mutualFollows.length}</p>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            <UserList users={mutualFollows} accentColor="text-emerald-400" />
          </div>
        </div>

        {/* Fans */}
        <div className="bg-[#111113] rounded-xl border border-white/6 p-5 text-center">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                Fans (Not Following Back)
              </h3>
            </div>
            <p className="text-2xl font-black text-cyan-400 ml-7">{notFollowing.length}</p>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            <UserList users={notFollowing} accentColor="text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-[#111113] rounded-xl border border-white/6 p-6">
        <p className="text-xs font-mono text-zinc-600 tracking-widest mb-5">— INSIGHTS —</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dynamicInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${insightDotColor[insight.color]}`}
              />
              <div>
                <p className="font-bold text-zinc-300 text-xs tracking-wide mb-0.5">
                  {insight.title.toUpperCase()}
                </p>
                <p className="text-zinc-600 text-xs font-mono leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
