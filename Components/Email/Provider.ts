import { useState, useCallback, useEffect } from 'react';
import constate from 'constate';
import { useQuery } from "@apollo/client"
import { EmailList } from "@src/graphql/queries/email/getEmailList"
import client from "@src/graphql/apollo"
import { service } from "@src/configs"

function useEmail() {

  const [emailList, setEmailList] = useState([])


  useEffect(() => {

    const getData = async () => {
      const { data } = await client.query({
        query: EmailList,
        variables: {
          countPerPage: 1000, page: 1
        },
        context: {
          headers: {
            authorization: localStorage?.getItem('nftDropsAuthorization'),
          },
        },
      })
      const gotEmailList = service.getValue(data, "subscriberList", [])
      setEmailList(gotEmailList)
    }
    getData()
  }, [])
  return { emailList }
}

const [Provider, useEmailList] = constate(
  // 선언한 custom hook을 주입하세요.
  useEmail,
  // custom hook에서 반환한 값을 selector로 지정하세요.
  // custom hook의 API로 사용될 수 있게 각각의 selector를 기술해주세요.
  (value) => value.emailList, // 현재 count 값 읽기
);

export { Provider, useEmailList };
