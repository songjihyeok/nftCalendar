import HeadInfo from "@src/Components/HeadInfo";
import HomeContent from "@src/Components/Home";
import Footer from "@src/Components/Footer";

import { projectListByFilter } from "@src/graphql/queries/Project/getFilteredList"

import client from "@src/graphql/apollo";
import { service } from "@src/configs"
import { nest } from "@src/configs"
import { Provider } from "@src/Components/Home/Provider";

interface HomeProps {
  posts: [];
  data: any[]
}
enum ProjectListOf {
  NEWEST = "NEWEST",
  PAST = "PAST",
  PROMOTED = "PROMOTED",
  TODAY = "TODAY",
  UPCOMING = "UPCOMING",
  VERIFIED = "VERIFIED",
}


const Home = (props: HomeProps) => {

  return (
    <div>
      <HeadInfo title={"NFT Drops: NFT Calendar"} />
      <HomeContent />
      <Footer></Footer>
    </div>
  );
};

export async function getStaticProps(context) {
  try {

    const { data } = await client.query({
      query: projectListByFilter, variables: { first: 20, of: ProjectListOf.NEWEST, isVisible: true, isPromoted: true },
      fetchPolicy: "no-cache"
    })
    const gotData = service.getValue(data, "projectListByFilter.edges", []).map((element) => element.node)

    return {
      revalidate: 30,
      props: {
        data: gotData,

      },
    }
  }
  catch (error) {
    return {
      props: {

      }
    }
  }
}


export default nest(Provider, Home)

