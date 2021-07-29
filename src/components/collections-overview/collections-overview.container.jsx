import { connect } from "react-redux";
import { compose } from "redux";
import  CollectionOverview  from "./collections-overview.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import  WithSpinner from "../with-spinner/with-spinner.component"; 

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionsOverviewContainer;