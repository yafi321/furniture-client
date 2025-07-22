import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
    return (
        <Box
            sx={{
                height: '100vh', // כל גובה המסך
                display: 'flex',
                justifyContent: 'center', // ממרכז לרוחב
                alignItems: 'center',     // ממרכז לגובה
            }}
        >
            {/* ספינר עם לוגו */}
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress size={120} thickness={2} color="primary" />
                <Box
                    component="img"
                    src="/images/logo-no-baeckground.png"
                    alt="logo"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 100,
                        height: 100,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Box>
        </Box>
    );
};

export default Loading;
