import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import requests from "../api/request";

export default function ContactPage(){
    const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = { ...form, createdAt: new Date().toISOString() } as any;
            await requests.Contact.submit(payload);
            alert("Mesajınız alındı. En kısa sürede size dönüş yapacağız.");
            setForm({ name: "", email: "", phone: "", company: "", message: "" });
        } catch (err) {
            alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
            console.error(err);
        }
    };

    return(
        <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h3" gutterBottom>İletişim</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Ürünlerimiz ve çözümlerimiz hakkında bilgi almak veya teklif talep etmek için formu doldurun. 
                        Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                    </Typography>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <TextField label="Ad Soyad" name="name" value={form.name} onChange={handleChange} required fullWidth />
                                    <TextField label="E-posta" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth />
                                    <TextField label="Telefon" name="phone" value={form.phone} onChange={handleChange} fullWidth />
                                    <TextField label="Firma" name="company" value={form.company} onChange={handleChange} fullWidth />
                                    <TextField label="Mesajınız" name="message" value={form.message} onChange={handleChange} multiline rows={4} required fullWidth />
                                    <Button type="submit" variant="contained">Gönder</Button>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h5" gutterBottom>İletişim Bilgileri</Typography>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography>Adres: Teknopark, İstanbul</Typography>
                        <Typography>Telefon: +90 212 000 00 00</Typography>
                        <Typography>E-posta: info@hirdanet.com</Typography>
                    </Stack>
                    <Typography variant="h5" gutterBottom>Çalışma Saatleri</Typography>
                    <Typography>Pazartesi - Cuma: 09:00 - 18:00</Typography>
                    <Typography>Cumartesi: 10:00 - 14:00</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}