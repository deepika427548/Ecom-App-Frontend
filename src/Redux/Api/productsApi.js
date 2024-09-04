import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/product' }),
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: (params) =>({url:"/getAllProducts",
          params:{
            page:params?.page,
            keyword:params?.keyword,
            category:params?.category,
            "price[gte]":params.min,
            "price[lte]":params.max,
            "rating[gte]":params?.ratings,

          },

        }),
      }),
      getProductById: builder.query({
        query: (id) =>`/getProductById/${id}`,
      }),
    }),
  })

  export const { useGetAllProductsQuery,useGetProductByIdQuery } = productApi;