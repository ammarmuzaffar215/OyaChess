import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import GamelogsPage from "../GamelogsPage/GamelogsPage";
import PackagesPage from "../PackagesPage/PackagesPage";
import EnrollmentsPage from "../EnrollmentsPage/EnrollmentsPage";
import MaterialsPage from "../MaterialsPage/MaterialsPage";
import ItemsPage from "../ItemsPage/ItemsPage";
import ReviewsPage from "../ReviewsPage/ReviewsPage";
import PurchasesPage from "../PurchasesPage/PurchasesPage";
import PuzzlesPage from "../PuzzlesPage/PuzzlesPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "gamelogs":
                return <GamelogsPage />;
case "packages":
                return <PackagesPage />;
case "enrollments":
                return <EnrollmentsPage />;
case "materials":
                return <MaterialsPage />;
case "items":
                return <ItemsPage />;
case "reviews":
                return <ReviewsPage />;
case "purchases":
                return <PurchasesPage />;
case "puzzles":
                return <PuzzlesPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
