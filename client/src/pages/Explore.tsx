import { useGetTopPostsQuery } from '@/redux/features/posts/postsSlice';
import { Loading, Card, Text } from '@nextui-org/react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import styles from '@/styles/layout.module.css';

function Protected() {
  const { data, isLoading } = useGetTopPostsQuery(null);
  if (isLoading) {
    return <Loading size='xl' />;
  }
  const { post: posts } = data;

  return (
    <div>
      {posts?.map((post: Post) => (
        <Card key={post.postid}>
          <Card.Header>
            <Text b>{post.postedBy}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text>{post.postText}</Text>
          </Card.Body>
          <Card.Footer>
            <Text>{formatDistanceToNow(parseISO(post.created_at))}</Text>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

export default Protected;
