// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Modal, ModalProps } from 'antd';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { nest } from '@src/configs';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import { useVisible } from '../Provider';
import ModalForm from './ModalForm';
import { Provider, useOnOk, useOnCancel, useAfterClose } from './Provider';

function NewsModal() {
  const visible = useVisible();
  const onOk = useOnOk();
  const onCancel = useOnCancel();
  const afterClose = useAfterClose();

  const modalProps: ModalProps = {
    centered: true,
    destroyOnClose: true,
    maskClosable: false,
    visible,
    title: 'Edit News',
    onOk,
    onCancel,
    afterClose,
  };

  return (
    <Modal {...modalProps}>
      <ModalForm />
    </Modal>
  );
}

export default nest(Provider, NewsModal);

// 함수로 작성한 styled component를 선언하세요.