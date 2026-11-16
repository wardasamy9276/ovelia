import Hore from "../(website)/home/HeroSection"
import ExperienceSection  from "../(website)/home/ExperienceSection"
import BeautyServicesSection from "../(website)/home/BeautyServicesSection"
import BeautySlider from "../(website)/home/BeautySlider"
import BeautyCategories from "../(website)/home/BeautyCategories"
import BeautyIntro from "../(website)/home/BeautyIntroSection"
import HowItWorksSection from "../(website)/home/HowItWorksSection"
import SectorsShowcases from "../(website)/home/SectorsShowcase"
import TechnologySection from "../(website)/home/TechnologySection"
import ExperienceJourney from "../(website)/home/ExperienceJourney"
import HowItWorks from "../(website)/home/HowItWorks"
import DevelopmentSteps from "../(website)/home/DevelopmentSteps"
import NeckAccessories from "../(website)/home/NeckAccessories"
import BlogShowcase from  "../(website)/home/BlogShowcase"
function page() {
  return (
    <div>
      <Hore />
      <ExperienceSection   />
      <BeautyServicesSection/>
      <BeautySlider />
      <BeautyCategories />
      <BeautyIntro />
      <HowItWorksSection />
      <SectorsShowcases/>
      <TechnologySection />
      
      <ExperienceJourney />
      <HowItWorks />
      <DevelopmentSteps  />
      <NeckAccessories />
      <BlogShowcase/>
    </div>
  )
}

export default page
