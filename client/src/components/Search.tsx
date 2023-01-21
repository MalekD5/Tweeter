import styles from '@/styles/layout.module.css';
import CreatePost from './CreatePost';

function Search() {
  return (
    <div className={styles.search_container}>
      <CreatePost />
    </div>
  );
}

export default Search;
