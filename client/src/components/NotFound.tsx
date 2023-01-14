import {Badge, Grid, Text} from "@nextui-org/react";

function NotFound() {
    return (
        <Grid.Container css={{ minHeight: '100vh'}} alignItems='center' justify='center'>
            <Grid>
                <Text css={{ textAlign: 'center '}} h3>
                    <Badge color='error' isSquared variant='flat' size='xl' css={{ alignSelf:'center', mr:'.2rem'}}>
                        404
                    </Badge>
                    | <span style={{ fontWeight: 'normal', marginRight:'.2rem' }}>Requested page not found</span>
                </Text>
            </Grid>
        </Grid.Container>
    );
}

export default NotFound;