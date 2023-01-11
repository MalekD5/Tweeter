import { Text, Loading, Card } from '@nextui-org/react';
import { useGetTopPostsQuery } from '@/redux/features/posts/postsSlice';
import { parseISO, formatDistanceToNow } from 'date-fns';

function Home() {
  const { data, isLoading } = useGetTopPostsQuery(null);

  if (isLoading) {
    return <Loading size='xl' />;
  }

  const { post: posts } = data;

  return (
    <div>
      <Text css={{ textAlign: 'center ' }} h1>
        Posts:
      </Text>
      {posts.map((post: Post) => (
        <Card
          css={{
            mt: '4rem',
            mw: '400px',
            mx: 'auto'
          }}
          key={post.postid}
        >
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

export default Home;
