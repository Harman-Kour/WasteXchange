import React, { useState, useEffect } from "react";
import { WasteListing } from "@/entities/WasteListing";
import { Interest } from "@/entities/Interest";
import { Transaction } from "@/entities/Transaction";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PlusCircle, Package, TrendingUp, Recycle, Leaf, Loader2 } from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentListings from "../components/dashboard/RecentListings";
import InterestsList from "../components/dashboard/InterestsList";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [interests, setInterests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      const [userListings, userInterests, userTransactions] = await Promise.all([
        WasteListing.filter({ created_by: currentUser.email }, "-created_date"),
        Interest.filter({ created_by: currentUser.email }, "-created_date", 10),
        Transaction.filter({ provider_email: currentUser.email }, "-created_date")
      ]);
      
      setListings(userListings);
      setInterests(userInterests);
      setTransactions(userTransactions);
    } catch (error) {
      User.loginWithRedirect(window.location.href);
    }
    setIsLoading(false);
  };

  const calculateStats = () => {
    const activeListings = listings.filter(l => l.status === "available").length;
    const totalMatches = interests.length;
    const wasteRecycled = transactions.reduce((sum, t) => sum + (t.quantity_exchanged || 0), 0);
    const co2Saved = transactions.reduce((sum, t) => sum + (t.co2_saved || 0), 0);

    return { activeListings, totalMatches, wasteRecycled, co2Saved };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.company_name || user?.full_name || 'User'}
            </h1>
            <p className="text-gray-600">Manage your waste materials and track your impact</p>
          </div>
          <Link to={createPageUrl("ListWaste")}>
            <Button className="brand-gradient text-white hover:opacity-90">
              <PlusCircle className="w-5 h-5 mr-2" />
              List New Waste
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Package}
            title="Active Listings"
            value={stats.activeListings}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            icon={TrendingUp}
            title="Total Matches"
            value={stats.totalMatches}
            color="text-emerald-600"
            bgColor="bg-emerald-100"
          />
          <StatsCard
            icon={Recycle}
            title="Waste Recycled"
            value={`${stats.wasteRecycled.toFixed(1)}T`}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
          <StatsCard
            icon={Leaf}
            title="CO₂ Saved"
            value={`${(stats.co2Saved / 1000).toFixed(1)}T`}
            color="text-green-600"
            bgColor="bg-green-100"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <RecentListings listings={listings} onRefresh={loadData} />
          </div>
          <div>
            <InterestsList interests={interests} />
          </div>
        </div>
      </div>
    </div>
  );
}