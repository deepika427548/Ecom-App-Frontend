import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/user' }),
    tagType:["User"],
    endpoints: (builder) => ({
        getUserProfile:builder.query({
            query:()=>`/getUserProfile`,
            transformResponse:(result)=>result.user,
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const{data}=await queryFulfilled;
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setLoading(false))
                } catch (error) {
                    dispatch(setLoading(false))
                    console.log(error);
                    
                }
            },
            providesTags:['User'] //to refetch the data
        }),
        updateProfile:builder.mutation({
            query(body){
                return{
                    url:"/updateUserProfile",
                    method:'PUT',
                    body,
                }
            },
invalidatesTags:["User"]
        }),
        uploadAvatar:builder.mutation({
            query(body){
                return{
                    url:"/uploadAvatar",
                    method:'PUT',
                    body,
                }
            },
invalidatesTags:["User"]
        })


    }),
  })

  export const {useGetUserProfileQuery,useUpdateProfileMutation,useUploadAvataMutation} = userApi;