import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const Image = styled('img')({
    width: '100%',
});

export const Loader = (props) => {

    const { loading = false, noOfItems } = props;

    return (
        <React.Fragment>
            {(Array.from(new Array(noOfItems))).map((item, index) =>
                <div style={{ paddingTop: '30px' }} key={`${index}-item`} >

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ margin: 1 }}>
                            {loading ? (
                                <Skeleton variant="circular">
                                    <Avatar />
                                </Skeleton>
                            ) : (
                                <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
                            )}
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            {loading ? (
                                <Skeleton width="100%">
                                    <Typography>.</Typography>
                                </Skeleton>
                            ) : (
                                null
                            )}
                        </Box>
                    </Box>

                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height={50}>
                            <div style={{ paddingTop: '57%' }} />
                        </Skeleton>
                    ) : (
                        <Image
                            src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                            alt=""
                        />
                    )}

                </div>
            )}
        </React.Fragment>

    )

}

Loader.propTypes = {
    loading: PropTypes.bool,
};


