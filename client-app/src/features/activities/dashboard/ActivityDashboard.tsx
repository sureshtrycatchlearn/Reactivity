import { Button, Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilters";
import { PagingParms } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceHolder";



export default observer(function ActivityDashBoard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParms(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size])

    return (
        <Grid >
            <Grid.Column width='12' >
                {activityStore.loadingInitial && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                    </>
                ) : (

                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <ActivityList />
                    </InfiniteScroll>
                )}

            </Grid.Column>
            <Grid.Column width='4'>
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})