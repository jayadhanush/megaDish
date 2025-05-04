
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/products/FeaturedProducts';
import { CategorySection } from '@/components/products/CategorySection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <FeaturesSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
