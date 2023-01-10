// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/admin/${localStorage.getItem('nftDropsAuthorization') ? 'drops' : 'login'}`);
  }, []);

  return <></>;
}

// 함수로 작성한 styled component를 선언하세요.