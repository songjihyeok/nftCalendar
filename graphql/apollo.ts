import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
// import { RestLink } from 'apollo-link-rest';

const endPoints = {
    api: `${process.env.NEXT_PUBLIC_API_APOLLO_URL}/graphql`,
};


const client = new ApolloClient({
    uri: endPoints.api,
    cache: new InMemoryCache({
        typePolicies: {
            ['Query']: {
                fields: {
                    ['projectListByFilter']: relayStylePagination(),
                    ['newsList']: {
                        merge: false,
                    },
                },
            },
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-first',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
    }
});

export default client;