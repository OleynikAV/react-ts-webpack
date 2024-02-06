import React, { useEffect } from 'react';
import { useGetPostsQuery } from '../../core/endPoints/endPointsPosts';
import { Box } from '@mui/material';
import { Cards } from '../../components/Card/Card';
import { handlerAlerts, handlerPreloader } from '../../core/redux/slices/storeSlice';
import { useAppDispatch } from '../../core/redux/hooks';
interface Props {

}
const Home: React.FC<Props> = () => {
   const dispatch = useAppDispatch();
   const { data: postLists = [], isError = false,isLoading = false, error = {} } = useGetPostsQuery({ type: 'posts' });

   useEffect(() => {
      if (isLoading) {
         dispatch(handlerPreloader(true));
      } else {
         dispatch(handlerPreloader(false));
      }

      if (isError) {
         if ('status' in error) {
            const errMsg = 'error' in error ? error.error : '';
            dispatch(handlerAlerts(({ type: 'error', description: errMsg , show: isError })));
         }
      }

   }, [isLoading, isError]);

   return (
      <Box>
         <Cards list={postLists}/>
      </Box>
   );
};
export default Home;