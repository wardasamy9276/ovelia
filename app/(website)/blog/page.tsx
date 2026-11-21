import HeroSection from "./HoreSction"
import LatestArticlesSection from "./LatestArticlesSection"
import BlogFeaturedSection from "./BlogFeaturedSection"
import BlogSkinFinderSection from "./BlogSkinFinderSection"
import  BlogFaqSection  from  "./BlogFaqSection"
import BlogCtaSection from "./BlogCtaSection"
import SectorsShowcase from "../home/SectorsShowcase"

function page() {
  return (
    <div>
<HeroSection />
<LatestArticlesSection />
<BlogFeaturedSection />
<BlogSkinFinderSection />
<BlogCtaSection />
<BlogFaqSection />
<SectorsShowcase />
</div>
  )
}

export default page
