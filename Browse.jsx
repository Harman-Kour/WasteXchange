import React, { useState, useEffect, useCallback } from "react";
import { WasteListing } from "@/entities/WasteListing";
import { User } from "@/entities/User";
import { Interest } from "@/entities/Interest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Package, Filter, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import ListingCard from "../components/browse/ListingCard";
import InterestDialog from "../components/browse/InterestDialog";

export default function BrowsePage() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const filterListings = useCallback(() => {
    let filtered = listings;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(l => l.category === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  }, [listings, searchQuery, categoryFilter]);

  useEffect(() => {
    filterListings();
  }, [filterListings]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    
    const data = await WasteListing.filter({ status: "available" }, "-created_date");
    setListings(data);
    setIsLoading(false);
  };

  const handleExpressInterest = (listing) => {
    if (!user) {
      User.loginWithRedirect(window.location.href);
      return;
    }
    setSelectedListing(listing);
    setShowInterestDialog(true);
  };

  const handleSubmitInterest = async (message) => {
    await Interest.create({
      listing_id: selectedListing.id,
      listing_title: selectedListing.title,
      message: message,
      interested_company: user.company_name || user.email,
    });
    setShowInterestDialog(false);
    setSelectedListing(null);
  };

  const categoryColors = {
    plastic: "bg-blue-100 text-blue-700 border-blue-200",
    metal: "bg-gray-100 text-gray-700 border-gray-200",
    organic: "bg-green-100 text-green-700 border-green-200",
    paper: "bg-amber-100 text-amber-700 border-amber-200",
    ewaste: "bg-purple-100 text-purple-700 border-purple-200",
    textile: "bg-pink-100 text-pink-700 border-pink-200",
    glass: "bg-cyan-100 text-cyan-700 border-cyan-200",
    chemical: "bg-red-100 text-red-700 border-red-200",
    construction: "bg-orange-100 text-orange-700 border-orange-200",
    other: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Browse Waste Materials
          </h1>
          <p className="text-gray-600">Find resources that match your needs</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by material, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
            <div className="md:col-span-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="ewaste">E-Waste</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="chemical">Chemical</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found
              </p>
            </div>

            <AnimatePresence mode="wait">
              {filteredListings.length === 0 ? (
                <motion.div
                  
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  
                  className="text-center py-20"
                >
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing, index) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      index={index}
                      categoryColors={categoryColors}
                      onExpressInterest={handleExpressInterest}
                      user={user}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <InterestDialog
        open={showInterestDialog}
        onOpenChange={setShowInterestDialog}
        listing={selectedListing}
        onSubmit={handleSubmitInterest}
      />
    </div>
  );
}