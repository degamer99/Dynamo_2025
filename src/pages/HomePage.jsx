import React from 'react';
import Hero from '../components/Hero';
import LegacySection from '../components/LegacySection';
import MagazineReader from '../components/MagazineReader';
import GraduandsWall from '../components/GraduandsWall';
import StaffDirectory from '../components/StaffDirectory';
import ProjectsShowcase from '../components/ProjectsShowcase';
import CommitteesSection from '../components/CommitteesSection';
import GallerySection from '../components/GallerySection';
import DownloadHub from '../components/DownloadHub';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LegacySection />
      <MagazineReader />
      <GraduandsWall />
      <StaffDirectory />
      <ProjectsShowcase />
      <CommitteesSection />
      <GallerySection />
      <DownloadHub />
    </>
  );
}
