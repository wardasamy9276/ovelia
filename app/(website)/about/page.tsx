
import AboutHeroSection from "./AboutHeroSectio"
import AboutValuesSection from "./AboutValuesSection"
import AboutJourneySection from "./AboutJourneySection"

import AboutStandardsSectio from "./AboutStandardsSection"

import NeckAccessoriesShowcase from "./NeckAccessoriesShowcase"
import    TechnologySection  from "../home/TechnologySection"
// import BeautyExperiencePortal from "./BeautyExperiencePortal"
import BlushOverviewSection from "./BlushOverviewSection"


function page() {
  return (
    <div>
   <AboutHeroSection />
    <TechnologySection />
    <BlushOverviewSection />
   {/* <BeautyExperiencePortal /> */}
   <AboutValuesSection/>
   <AboutJourneySection/>
 <AboutStandardsSectio/>
<NeckAccessoriesShowcase/>
      
    </div>
  )
}

export default page
