import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { SearchProvider } from './context/SearchContext'; // Import SearchProvider
import AdminLayout from './layouts/AdminLayout';
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyRegistration from './pages/auth/CompanyRegistration';
import BusinessLogin from './pages/auth/BusinessLogin';
import UserProfile from './pages/user/UserProfile';
import AboutUsPage from './pages/user/AboutUsPage';
import CompanyProfile from './pages/user/CompanyProfile';
import HomePage from './pages/user/HomePage';
import Login from './pages/user/Login';
import SearchPage from './pages/user/SearchPage';
import Signup from './pages/user/Signup';
import UserDashboard from './pages/user/UserDashboard';
import WriteReviewPage from './pages/user/WriteReviewPage';
import CompanyResponse from './pages/company/CompanyResponse';
// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import CompanyRequests from './pages/admin/CompanyRequests';
import Reviews from './pages/admin/Reviews';
import Users from './pages/admin/Users';
import Businesses from './pages/admin/Businesses';
import ReviewReports from './pages/admin/ReviewReports';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <SearchProvider>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="reviewreports" element={<ReviewReports />} />
              <Route path="users" element={<Users />} />
              <Route path="businesses" element={<Businesses />} />
              <Route path="company-requests" element={<CompanyRequests />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/business-login" element={<BusinessLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register/company" element={<CompanyRegistration />} />

            {/* Company routes */}
            <Route path="/company">
              <Route index element={<CompanyDashboard />} />
              <Route path="profile" element={<CompanyProfile />} />
              <Route path="response" element={<CompanyResponse />} />
              <Route path="response/:reviewId" element={<CompanyResponse />} />
            </Route>

            {/* User routes */}
            <Route path="/user">
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="write-review" element={<WriteReviewPage />} />
            </Route>

            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* Add new route for viewing company profiles */}
            <Route path="/companies/:companyId" element={<CompanyProfile />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
