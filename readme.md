# Note

서버 재실행 모듈: nodemon

## REST API란?

1. Uniform interface(간결, 형식의 일관성, 예측가능)
2. Client-server 역할 구분하기
3. Stateless(요청들은 독립적으로 처리)
4. Cacheable
5. Layered System
6. Code on Demand

### URL 이름짓기 관습

- 단어들을 동사보다는 명사 위주로 구성함
- 응용해서 다른 정보들을 쉽게 가져올 수 있을 정도로 일관성 있음
- 대충 봐도 어떤 정보가 들어올지 예측이 가능함
- 띄어쓰기는 언더바\_대신 대시-기호-사용
- 파일 확장자 쓰지 말기 (.html 이런거)
- 하위 문서들을 뜻할 땐 / 기호를 사용함 (하위폴더같은 느낌)
-

#### 예제

instagram.com/explore/tags/kpop
instagram.com/explore/tags/food
facebook.com/natgeo/photos
facebook.com/bbc/photos

## Database
데이터베이스는 SQL이라는 언어를 써서 데이터를 입력, 출력한다.

### MongoDB 사용하는 이유
- 처음 다룰 때 어려운 셋팅작업이 필요하지 않음 (스키마 생성 등 필요없음)
- SQL 안배워도 됨
- 복잡한 자료형 몰라도 됨
- 평생 무료 호스팅해주는 곳이 있음 
