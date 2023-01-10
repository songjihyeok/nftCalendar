// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import News from '@src/Components/News';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export default function NewsPage() {
  return <News />;
}

// 함수로 작성한 styled component를 선언하세요.

