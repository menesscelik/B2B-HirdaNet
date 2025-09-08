import { Box, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react";

export default function HomePage(){
    const welcomes = useMemo(() => [
        { text: "Hoş geldiniz", sub: "Türkçe" },
        { text: "Welcome", sub: "English" },
        { text: "Willkommen", sub: "Deutsch" },
        { text: "Bienvenido", sub: "Español" },
        { text: "Bienvenue", sub: "Français" }
    ], []);

    const [index, setIndex] = useState(0);
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

    useEffect(() => {
        const rotator = setInterval(() => setIndex(i => (i + 1) % welcomes.length), 2000);
        const ticker = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => { clearInterval(rotator); clearInterval(ticker); };
    }, [welcomes.length]);

    const current = welcomes[index];

    return(
        <Box sx={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: (theme) => `radial-gradient(circle at 20% 20%, ${theme.palette.primary.light}22, transparent 40%), radial-gradient(circle at 80% 30%, ${theme.palette.secondary.light}22, transparent 40%)`,
            p: 4,
        }}>
            <Box sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(255,255,255,0.55)',
                borderRadius: 4,
                px: { xs: 3, md: 6 },
                py: { xs: 4, md: 6 },
                boxShadow: 3,
                maxWidth: 800,
                width: '100%'
            }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 1,
                        transition: 'opacity 400ms ease, transform 400ms ease',
                        opacity: 1,
                        transform: 'translateY(0)'
                    }}>
                    {current.text}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                    {current.sub}
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" color="text.secondary">
                        {time}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}