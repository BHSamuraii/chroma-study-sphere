
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/DashboardHeader';
import { EnrolledCourses } from '@/components/EnrolledCourses';
import { AvailableCourses } from '@/components/AvailableCourses';
import { ProfileSection } from '@/components/ProfileSection';
import { Toaster } from '@/components/ui/toaster';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EnrolledCourses />
            <AvailableCourses />
          </div>
          <div className="lg:col-span-1">
            <ProfileSection />
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Dashboard;
