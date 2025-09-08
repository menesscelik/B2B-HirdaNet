import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import requests from '../../api/request';

interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
}

const AdminContactPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = async () => {
    const data = await requests.Admin.contactMessages();
    setMessages(data);
  };

  const handleDelete = async (index: number) => {
    try {
      await requests.Admin.deleteContactMessage(index);
      toast.success('Mesaj silindi');
      await load();
    } catch (error) {
      toast.error('Mesaj silinirken hata oluştu');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gelen Mesajlar</Typography>
      <Grid container spacing={2}>
        {messages.map((m, idx) => (
          <Grid key={idx} size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">{m.name} ({m.email})</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(m.createdAt).toLocaleString()}</Typography>
                {m.phone && <Typography variant="body2">Tel: {m.phone}</Typography>}
                {m.company && <Typography variant="body2">Firma: {m.company}</Typography>}
                <Typography variant="body1" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.message}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => { setSelected(m); setOpen(true); }}>Ayrıntıları Gör</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(idx)}>Sil</Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
        {messages.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography>Henüz mesaj yok.</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Mesaj Ayrıntıları</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Typography variant="subtitle1">{selected?.name} ({selected?.email})</Typography>
            <Typography variant="caption" color="text.secondary">{selected ? new Date(selected.createdAt).toLocaleString() : ''}</Typography>
            {selected?.phone && <Typography variant="body2">Tel: {selected.phone}</Typography>}
            {selected?.company && <Typography variant="body2">Firma: {selected.company}</Typography>}
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{selected?.message}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Kapat</Button>
          {selected && (
            <Button 
              color="error" 
              onClick={() => {
                const index = messages.findIndex(m => m === selected);
                if (index !== -1) {
                  handleDelete(index);
                  setOpen(false);
                }
              }}
            >
              Sil
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminContactPage;


