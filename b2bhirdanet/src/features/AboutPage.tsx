import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

export default function AboutPage() {
    return (
        <Box sx={{ p: 4 }}>
            <Stack spacing={4}>
                <Box>
                    <Typography variant="h2" gutterBottom>B2B Nedir?</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        B2B (Business-to-Business), işletmeler arası ürün ve hizmet alışverişini dijitalleştiren ticaret modelidir.
                        Örneğin, "Örnek Tedarik A.Ş." gibi bir tedarikçi firma, bayi ve kurumsal müşterilerine özel fiyat, toplu sipariş ve hızlı sevkiyat
                        süreçleri sunarak operasyonlarını verimli hale getirir.
                    </Typography>
                </Box>

                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Nasıl Çalışır? (Örnek: Örnek Tedarik A.Ş.)</Typography>
                        <ol>
                            <li>Bayiler hesap oluşturur ve rolleri atanır (Firma Yöneticisi / Satın Alma)</li>
                            <li>Tedarikçi ürünleri ekler, fiyat ve stokları yönetir</li>
                            <li>Bayiler katalogdan ürünleri inceleyip toplu sipariş oluşturur</li>
                            <li>Tedarikçi siparişleri onaylar, sevkiyat ve fatura süreçlerini yönetir</li>
                        </ol>
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Avantajlar</Typography>
                                <ul>
                                    <li>Toplu sipariş ve özel fiyatlandırma</li>
                                    <li>Güncel stok ve hızlı teklif yönetimi</li>
                                    <li>Rol bazlı yetkilendirme ile güvenli erişim</li>
                                    <li>Kolay entegrasyon: ürün, sipariş ve kullanıcı yönetimi</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Neden B2B?</Typography>
                                <ul>
                                    <li>Operasyon maliyetlerini düşürür</li>
                                    <li>Sipariş ve ödeme süreçlerini şeffaflaştırır</li>
                                    <li>Müşteri deneyimini iyileştirir</li>
                                    <li>Ölçeklenebilir, güvenli ve esnek</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Hirdanet ile Hırdavat Tedariki</Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            Hırdavat, el aletleri ve endüstriyel sarf malzemeleri tedarik süreçlerinizi uçtan uca dijitalleştirir.
                            Hirdanet ile bayi ve kurumsal müşterilerinize tek panelden kesintisiz deneyim sunun.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2">Sunduğumuz Başlıca Özellikler</Typography>
                                <ul>
                                    <li>Kategori/marka bazlı ürün yönetimi</li>
                                    <li>Özel fiyat listeleri ve iskonto yapıları</li>
                                    <li>Gerçek zamanlı stok takibi ve minimum stok uyarıları</li>
                                    <li>Toplu sipariş, teklif ve onay akışları</li>
                                </ul>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2">Operasyonel Kolaylıklar</Typography>
                                <ul>
                                    <li>Hızlı arama ve filtreleme ile ürün bulma</li>
                                    <li>Sevkiyat ve faturalama durum takibi</li>
                                    <li>Rol/Yetki bazlı kullanıcı yönetimi</li>
                                    <li>Esnek raporlama ve sipariş analizleri</li>
                                </ul>
                            </Grid>
                        </Grid>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button variant="contained" href="/catalog">Hırdavat Kataloğuna Göz At</Button>
                            <Button variant="outlined" href="/contact">Teklif Al</Button>
                        </Stack>
                    </CardContent>
                </Card>

                
            </Stack>
        </Box>
    );
}