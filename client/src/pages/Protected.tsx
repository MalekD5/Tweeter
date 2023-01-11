import { Button, Text } from '@nextui-org/react';
import { useLogoutMutation } from '@/redux/features/auth/authServiceSlice';
import { useNavigate } from 'react-router-dom';

function Protected() {
  const navigate = useNavigate();
  const [logoutRequest] = useLogoutMutation();

  const handleClick = async () => {
    await logoutRequest(null);
    navigate('/login');
  };
  return (
    <div>
      <Text h1 b>
        Protect page
      </Text>
      <Button onPress={() => handleClick()}>Logout</Button>
    </div>
  );
}

export default Protected;
