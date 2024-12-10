import { createApi } from "@reduxjs/toolkit/query/react"
import {
    IBalanceType,
    IStats,
    InterfacePagination,
    ValidatorType,
} from "./type"
import verifiedValidators from "./validator.json"
import apiWrapper from "./wrapper/httpapi"

export const statsApi = createApi({
    reducerPath: "statsApi",
    baseQuery: apiWrapper,
    tagTypes: ["ValidatorsList", "CommuneStats", "SingleValidator"],
    endpoints: (builder) => ({
        getValidators: builder.query<ValidatorType[], void>({
            query: () => "/validators/",
            providesTags: ["ValidatorsList"],
            transformResponse: (response: InterfacePagination<ValidatorType[]>) => {
                const validatedResponse: ValidatorType[] = response.validators.map(
                    (validator) => {
                        if (verifiedValidators.some((v) => v.key === validator.key)) {
                            validator.isVerified = true
                        } else {
                            validator.isVerified = false
                        }
                        return validator
                    },
                )
                return validatedResponse.toSorted((a) =>
                    a.key === process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR ? -1 : 1,
                )
            },
        }),
        getValidatorsById: builder.query<
            ValidatorType,
            { key: string; wallet: string }
        >({
            query: ({ key, wallet }) => `/validators/${key}?wallet=${wallet}`,
            providesTags: (_, __, { key }) => [{ type: "SingleValidator", id: key }],
            transformResponse: (response: ValidatorType) => {
                const isVerified = verifiedValidators.some(
                    (validator) => validator.key === response.key,
                )
                const validatedResponse: ValidatorType = {
                    ...response,
                    isVerified: isVerified,
                }
                return validatedResponse
            },
        }),
        getTotalStats: builder.query<IStats, void>({
            query: () => "/stats/",
            providesTags: ["CommuneStats"],
            transformResponse: (response: { stats: IStats }) => {
                return response.stats
            },
        }),
        getBalance: builder.query<IBalanceType, { wallet: string }>({
            query: ({ wallet }) => `/balance/?wallet=${wallet}`,
            providesTags: ["SingleValidator"],
            transformResponse: (response: IBalanceType) => {
                return response
            },
        }),
        searchBalance: builder.mutation<IBalanceType, { wallet: string }>({
            query: ({ wallet }) => `/balance/?wallet=${wallet}`,
            transformResponse: (response: IBalanceType) => {
                return response
            },
        }),
    }),
})

export const {
    useGetValidatorsQuery,
    useGetBalanceQuery,
    useGetTotalStatsQuery,
    useSearchBalanceMutation,
    useGetValidatorsByIdQuery,
} = statsApi
