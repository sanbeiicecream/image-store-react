import { Tips } from '@/components/Tips';
import { Uploader } from '@/components/Uploader';

const Home = () => {
  return (
    <>
      {<Tips>请登录后再上传！！！</Tips>}
      <Uploader />
    </>
  );
};

export default Home;
