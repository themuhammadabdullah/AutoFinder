//imports
import AutoStore from "../layout/AutoStore/AutoStore";
import BodyStyle from "../layout/BodyStyle/bodyStyle";
import Browsevideos from "../layout/BrowseVideos/Browsevideos";
import ExploreProducts from "../layout/ExploreProducts/ExploreProducts";
import Footer from "../layout/Footer/Footer";
import GetPakwheels from "../layout/GetPakwheels/GetPakwheels";
import Homewidget from "../layout/Homewidget/Homewidget";
import LatestUsedBikesOverlay from "../layout/LatestUsedBikes/LatestUsedBikesOverlay";
import LatestUsedCarsOverlay from "../layout/LatestUsedCars/LatestUsedCarsOverlay";
import SearchOverlay from "../layout/Searcbox/SearchOverlay";
import BrowseUsedCatagories from "../layout/BrowseUsedCatagories/BrowseUsedCatagories";
import SpecialOffers from "../layout/SpecialOffers/SpecialOffers";
import ManagedByPakWheels from "../layout/ManagedByPakWheels/ManagedByPakWheels";
import FeaturedUsedCars from "../layout/FeaturedUsedCar/FeaturedUsedCars";
import FeaturedNewCars from "../layout/FeaturedNewCars/FeaturedNewCars";
import NewCarsByMake from "../layout/NewCarsByMake/NewCarsByMake";

function Home() {
  return (
    <div>
      <SearchOverlay />
      <Homewidget />
      <LatestUsedCarsOverlay />
      <LatestUsedBikesOverlay />
      <ExploreProducts />
      <BodyStyle />
      <AutoStore />

      <BrowseUsedCatagories />
      <SpecialOffers />
      <ManagedByPakWheels />
      <FeaturedUsedCars />
      <FeaturedNewCars />
      <NewCarsByMake />
      <Browsevideos />
      <GetPakwheels />
      <Footer />
    </div>
  );
}

export default Home;
