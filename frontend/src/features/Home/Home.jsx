import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import StatisticsSection from "./components/StatisticsSection";
import DashboardPreviewSection from "./components/DashboardPreviewSection";
import LeaderboardPreviewSection from "./components/LeaderboardPreviewSection";
import TopPerformersSection from "./components/TopPerformersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import {
  heroStats,
  features,
  statistics,
  topPerformersPreview,
  leaderboardPreview,
  testimonials,
} from "./data/homeMockData";
import "./styles/Home.css";

export default function Home() {
  return (
    <div className="hm-page">
      <HeroSection stats={heroStats} />
      <FeaturesSection features={features} />
      <StatisticsSection statistics={statistics} />
      <DashboardPreviewSection />
      <LeaderboardPreviewSection items={leaderboardPreview} />
      <TopPerformersSection items={topPerformersPreview} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </div>
  );
}
