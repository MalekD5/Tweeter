import styles from '@/styles/layout.module.css';
import CreatePost from './CreatePost';
import { Avatar, Textarea } from '@nextui-org/react';

function Search() {
  return (
    <div className={styles.search_container}>
      <div className={styles.search_tweet}>
        <Avatar src='' />
        <Textarea underlined placeholder='what is happening?' />
      </div>
    </div>
  );
}

export default Search;
