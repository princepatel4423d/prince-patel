import React, { Suspense, useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

// COMMON PAGES
import LoadingSpinner from "@/components/common/LoadingSpinner";
import NotFound from "@/components/common/NotFound";
import AdminNotFound from "@/admin/components/common/AdminNotFound";

// LAYOUT
import Layout from "@/layout/Layout";
import AdminLayout from "@/admin/layout/AdminLayout";

// PORTFOLIO PAGES
import Home from "@/pages/home/Home";
import Blog from "@/pages/blog/Blog";
import BlogPost from "@/pages/blog/components/BlogPost";
import About from "@/pages/about/About";
import Project from "@/pages/project/Project";
import CV from "@/components/cv/CV";
import Contact from "@/pages/more/Contact";
import Milestone from "@/pages/more/Milestone";
import Attribution from "@/pages/more/Attribution";
import SocialLinks from "@/pages/about/components/SocialLinks";

// ADMIN AUTH PAGES
import Login from "@/admin/auth/Login";
import ResetPassword from "@/admin/auth/ResetPassword";

// ADMIN PAGES 
import Dashboard from "@/admin/pages/dashboard/Dashboard";
import BlogList from "@/admin/pages/blog/BlogList";
import AddBlog from "@/admin/pages/blog/AddBlog";
import EditBlog from "@/admin/pages/blog/EditBlog";
import ProjectList from "@/admin/pages/project/ProjectList";
import AddProject from "@/admin/pages/project/AddProject";
import EditProject from "@/admin/pages/project/EditProject";
import EducationList from "@/admin/pages/education/EducationList";
import AddEducation from "@/admin/pages/education/AddEducation";
import EditEducation from "@/admin/pages/education/EditEducation";
import WorkList from "@/admin/pages/work/WorkList";
import AddWork from "@/admin/pages/work/AddWork";
import EditWork from "@/admin/pages/work/EditWork";
import SocialMediaList from "@/admin/pages/socialmedia/SocialMediaList";
import AddSocialMedia from "@/admin/pages/socialmedia/AddSocialMedia";
import EditSocialMedia from "@/admin/pages/socialmedia/EditSocialMedia";
import MilestoneList from "@/admin/pages/milestone/MilestoneList";
import AddMilestone from "@/admin/pages/milestone/AddMilestone";
import EditMilestone from "@/admin/pages/milestone/EditMilestone";
import Category from "@/pages/blog/components/Category";
import Tag from "@/pages/blog/components/Tag";

const AdminProtected = () => {
  const { isLoggedin, loading } = useContext(AppContext);

  if (loading) return <LoadingSpinner />;
  if (!isLoggedin) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>

        {/* PORTFOLIO ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post/:slug" element={<BlogPost />} />
          <Route path="/blog/categories" element={<Category />} />
          <Route path="/blog/tags" element={<Tag />} />
          <Route path="/About" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/milestone" element={<Milestone />} />
          <Route path="/Attribution" element={<Attribution />} />
          <Route path="/social-links" element={<SocialLinks />} />
        </Route>

        {/* Portfolio 404 (outside layout) */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />

        {/* ADMIN AUTH */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* ADMIN PROTECTED */}
        <Route path="/admin" element={<AdminProtected />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blog/list" element={<BlogList />} />
            <Route path="blog/add" element={<AddBlog />} />
            <Route path="blog/edit/:id" element={<EditBlog />} />
            <Route path="project/list" element={<ProjectList />} />
            <Route path="project/add" element={<AddProject />} />
            <Route path="project/edit/:id" element={<EditProject />} />
            <Route path="education/list" element={<EducationList />} />
            <Route path="education/add" element={<AddEducation />} />
            <Route path="education/edit/:id" element={<EditEducation />} />
            <Route path="work/list" element={<WorkList />} />
            <Route path="work/add" element={<AddWork />} />
            <Route path="work/edit/:id" element={<EditWork />} />
            <Route path="social/list" element={<SocialMediaList />} />
            <Route path="social/add" element={<AddSocialMedia />} />
            <Route path="social/edit/:id" element={<EditSocialMedia />} />
            <Route path="milestone/list" element={<MilestoneList />} />
            <Route path="milestone/add" element={<AddMilestone />} />
            <Route path="milestone/edit/:id" element={<EditMilestone />} />
          </Route>
        </Route>

        {/* Admin 404 */}
        <Route path="/admin/*" element={<AdminNotFound />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;