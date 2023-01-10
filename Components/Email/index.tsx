import { Table } from 'antd';


import { nest } from '@src/configs'
import { Provider, useEmailList } from "./Provider"

const columns = [
  {
    key: 'email',
    title: '이메일',
    dataIndex: ['email'],
  },
  {
    key: 'createdDateTime',
    title: '생성시간',
    dataIndex: ['createdDateTime'],
  },
]



function EmailList() {
  const emailList = useEmailList()

  return (
    <Table dataSource={emailList} columns={columns}></Table>
  );
}

// 함수로 작성한 styled component를 선언하세요.

export default nest(Provider, EmailList)